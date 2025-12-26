import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/server/prisma";
import { getAuthUser } from "@lib/server/appApiUtils";
import { deleteBlobs } from "@lib/server/blob";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const firebaseUser = await getAuthUser(_req);
  if (!firebaseUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const postId = params.id;

  const dbUser = await prisma.user.findUnique({
    where: { firebaseUid: firebaseUser.uid },
  });
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post || !dbUser)
    return NextResponse.json({ message: "Please login to delete this post" }, { status: 404 });
  if (post.authorId !== dbUser.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const content = post.content as { imageUrl?: string | null; videoUrl?: string | null };
  try {
    // ensure blobs are deleted before removing DB record
    await deleteBlobs([content?.imageUrl, content?.videoUrl]);
  } catch (err) {
    console.error("Failed to delete blob, aborting DB delete", err);
    return NextResponse.json({ message: "Failed to delete file" }, { status: 500 });
  }

  try {
    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { postId } }),
      prisma.postLike.deleteMany({ where: { postId } }),
      prisma.post.delete({ where: { id: postId } }),
    ]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting post", error);
    return NextResponse.json({ message: "Failed to delete post" }, { status: 500 });
  }
}
