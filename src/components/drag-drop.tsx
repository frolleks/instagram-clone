"use client";

import { type Accept, useDropzone } from "react-dropzone";

interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  accept?: Accept | undefined;
  multiple?: boolean;
}

export function DragDrop({ onDrop, accept, multiple }: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  );
}
