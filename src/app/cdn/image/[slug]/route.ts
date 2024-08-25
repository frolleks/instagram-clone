import { s3 } from "@/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const Key = params.slug;

  const getImage = new GetObjectCommand({
    Bucket: process.env.IMAGE_BUCKET_NAME!,
    Key,
  });

  const response = await s3.send(getImage);

  if (!response.Body) {
    return new Response("Image not found", { status: 404 });
  }

  const streamToBuffer = async (stream: any): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
  };

  try {
    const buffer = await streamToBuffer(response.Body);

    return new Response(buffer, {
      headers: {
        "Content-Type": response.ContentType!,
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing image" },
      {
        status: 500,
      }
    );
  }
}
