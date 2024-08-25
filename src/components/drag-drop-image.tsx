"use client";

import { useCallback, useState } from "react";
import { DragDrop } from "./drag-drop";
import { UploadForm } from "./upload-form";

export function DragDropImage() {
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [key, setKey] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    fetch("/api/create-presigned-post")
      .then((res) => res.json())
      .then((data) => {
        const formData = new FormData();

        Object.entries(data.fields).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        formData.append("Content-Type", file.type);
        formData.append("file", file);

        console.log("Received key:", data.fields.key);
        setKey(data.fields.key);
        setUploadStatus("uploading");

        return fetch(data.url, {
          method: "POST",
          body: formData,
        });
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        setUploadStatus("finished");
      })
      .catch((error) => {
        console.error("Error:", error);
        setUploadStatus("idle");
      });
  }, []);

  return uploadStatus !== "idle" ? (
    <UploadForm objectKey={key} uploadStatus={uploadStatus} />
  ) : (
    <DragDrop
      onDrop={onDrop}
      accept={{ "image/*": [".png", ".jpg", ".gif", ".jpeg"] }}
      multiple={false}
    />
  );
}
