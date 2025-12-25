import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/server/prisma";
import { postCreateSchema } from "../../../types/schemas";
import { getAuthUser, mapPost, unauthorized } from "@lib/server/appApiUtils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const groupId = req.nextUrl.searchParams.get("groupId");
  if (!groupId) {
    return NextResponse.json({ message: "groupId is required" }, { status: 400 });
  }

  const posts = await prisma.post.findMany({
    where: { groupId },
    orderBy: { createdAt: "desc" },
    include: { author: true, likes: true },
  });
  return NextResponse.json({ posts: posts.map(mapPost) });
}

export async function POST(req: NextRequest) {
  const firebaseUser = await getAuthUser(req);
  if (!firebaseUser) return unauthorized();

  const body = await req.json();
  const parsed = postCreateSchema.safeParse(body || {});
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });
  }
  const { content, groupId } = parsed.data;

  const dbUser = await prisma.user.findUnique({
    where: { firebaseUid: firebaseUser.uid },
  });
  if (!dbUser) return NextResponse.json({ message: "User not found" }, { status: 401 });

  const groupExists = await prisma.group.findUnique({ where: { id: groupId } });
  if (!groupExists) {
    return NextResponse.json({ message: "Invalid groupId" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      content: content || {},
      groupId,
      authorId: dbUser.id,
    },
    include: { author: true, likes: true },
  });

  return NextResponse.json({ post: mapPost(post) }, { status: 201 });
}
