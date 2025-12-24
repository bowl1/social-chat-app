import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/server/prisma";
import { getAuthUser, unauthorized } from "@lib/server/appApiUtils";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const firebaseUser = await getAuthUser(req);
  if (!firebaseUser) return unauthorized();

  const postId = params.id;
  const dbUser = await prisma.user.findUnique({
    where: { firebaseUid: firebaseUser.uid },
  });
  if (!dbUser) {
    return NextResponse.json({ message: "User not found" }, { status: 401 });
  }

  const existing = await prisma.postLike.findUnique({
    where: { userId_postId: { userId: dbUser.id, postId } },
  });

  if (existing) {
    await prisma.postLike.delete({ where: { id: existing.id } });
  } else {
    await prisma.postLike.create({
      data: {
        userId: dbUser.id,
        postId,
      },
    });
  }

  const likes = await prisma.postLike.findMany({ where: { postId } });
  return NextResponse.json({ likes: likes.map((l) => l.userId) });
}
