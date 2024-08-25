import { S3Client } from "@aws-sdk/client-s3";

const endpoint = process.env.S3_ENDPOINT!;

export const s3 = endpoint
  ? new S3Client({
      region: "auto",
      endpoint,
      forcePathStyle: true,
    })
  : new S3Client({
      region: process.env.S3_REGION!,
    });
