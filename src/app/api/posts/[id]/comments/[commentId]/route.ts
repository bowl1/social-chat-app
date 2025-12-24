import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/server/prisma";
import { getAuthUser, unauthorized } from "@lib/server/appApiUtils";

export const dynamic = "force-dynamic";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; commentId: string } },
) {
  const firebaseUser = await getAuthUser(req);
  if (!firebaseUser) return unauthorized();

  const { commentId } = params;
  const dbUser = await prisma.user.findUnique({
    where: { firebaseUid: firebaseUser.uid },
  });
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });

  if (!comment || !dbUser) {
    return NextResponse.json({ message: "Comment not found" }, { status: 404 });
  }
  if (comment.authorId !== dbUser.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  await prisma.comment.delete({ where: { id: commentId } });
  return NextResponse.json({ ok: true });
}
