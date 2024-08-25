import { auth } from "@/auth";
import { db } from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { caption, imageUrl } = await req.json();
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json(
      {
        error: "You have to be logged in to make posts.",
      },
      { status: 401 }
    );
  }

  await db.post.create({
    data: {
      authorId: session.user.id,
      caption,
      imageUrl,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
