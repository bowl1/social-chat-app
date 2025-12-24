import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/server/prisma";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const postId = params.id;
  const likes = await prisma.postLike.findMany({ where: { postId } });
  return NextResponse.json({ likes: likes.map((l) => l.userId) });
}
