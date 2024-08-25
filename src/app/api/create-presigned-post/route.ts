import { auth } from "@/auth";
import { s3 } from "@/s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { createId } from "@paralleldrive/cuid2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let session;
  try {
    session = await auth();
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching session: " + error.message },
      { status: 500 }
    );
  }

  if (!session) {
    return NextResponse.json(
      {
        error: "You have to be logged in to upload images.",
      },
      { status: 401 }
    );
  }

  const Bucket = process.env.IMAGE_BUCKET_NAME!;
  const Key = createId();

  const { url, fields } = await createPresignedPost(s3, {
    Bucket,
    Key,
    Expires: 3600,
    Conditions: [["starts-with", "$Content-Type", "image/"]],
  });

  return new Response(
    JSON.stringify({
      url,
      fields,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
