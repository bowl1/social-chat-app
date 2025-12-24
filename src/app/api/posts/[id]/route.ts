import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/server/prisma";
import { getAuthUser } from "@lib/server/appApiUtils";

export const dynamic = "force-dynamic";

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
