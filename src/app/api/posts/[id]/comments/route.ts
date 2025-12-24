import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/server/prisma";
import { getAuthUser, mapComment, unauthorized } from "@lib/server/appApiUtils";
import { commentCreateSchema } from "../../../../../types/schemas";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const postId = params.id;
  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
    include: { author: true },
  });
  return NextResponse.json({ comments: comments.map(mapComment) });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const firebaseUser = await getAuthUser(req);
  if (!firebaseUser) return unauthorized();

  const body = await req.json();
  const parsed = commentCreateSchema.safeParse({
    ...body,
    postId: params.id,
  });
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });
  }
  const { content, postId, groupId, parentId = null } = parsed.data;

  const dbUser = await prisma.user.findUnique({
    where: { firebaseUid: firebaseUser.uid },
  });
  if (!dbUser) {
    return NextResponse.json({ message: "User not found" }, { status: 401 });
  }

  const comment = await prisma.comment.create({
    data: {
      content: content || "",
      postId,
      groupId,
      parentId,
      authorId: dbUser.id,
    },
    include: { author: true },
  });

  return NextResponse.json({ comment: mapComment(comment) }, { status: 201 });
}
