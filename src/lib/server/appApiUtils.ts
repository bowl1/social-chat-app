import { NextRequest, NextResponse } from "next/server";
import { admin } from "./firebaseAdmin";
import { prisma } from "./prisma";
import { Comment, Post, PostLike, User } from "@prisma/client";

export const DEFAULT_AVATAR = "/default-avatar.png";

export const getAuthUser = async (req: NextRequest) => {
  const header = req.headers.get("authorization");
  if (!header || !header.startsWith("Bearer ")) return null;
  const token = header.replace("Bearer ", "");
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded;
  } catch (error) {
    console.error("Auth error", error);
    return null;
  }
};

export const ensureDefaultGroup = async () => {
  await prisma.group.upsert({
    where: { id: "group-just-talk" },
    update: { isDefault: true, name: "just want to talk" },
    create: {
      id: "group-just-talk",
      name: "just want to talk",
      isDefault: true,
    },
  });

  await prisma.group.upsert({
    where: { id: "group-sleepless" },
    update: { isDefault: false, name: "sleepless night" },
    create: {
      id: "group-sleepless",
      name: "sleepless night",
      isDefault: false,
    },
  });

  await prisma.group.upsert({
    where: { id: "group-vulnerable" },
    update: { isDefault: false, name: "It's okay to be vulnerable" },
    create: {
      id: "group-vulnerable",
      name: "It's okay to be vulnerable",
      isDefault: false,
    },
  });
};

export const mapPost = (
  post:
    | (Post & { author: User; likes: PostLike[]; _count?: { comments?: number } })
    | (Post & { author?: User; likes?: PostLike[]; _count?: { comments?: number } }), // for guest users
) => ({
  objectId: post.id,
  content: (post as any).content || {},
  userName: (post as any).content?.aliasName || (post.author ? post.author.username : "Unknown"),
  userAvatar: (post as any).content?.aliasAvatar || post.author?.avatar || DEFAULT_AVATAR,
  group: post.groupId,
  likes: (post.likes || []).map((l) => l.userId),
  createdAt: (post as any).createdAt,
  commentCount: (post as any)._count?.comments ?? 0,
});

export const mapComment = (comment: Comment & { author: User }) => ({
  id: comment.id,
  author: (comment as any).content?.aliasName || comment.author.username,
  avatar: (comment as any).content?.aliasAvatar || comment.author.avatar || DEFAULT_AVATAR,
  content: (comment as any).content,
  parentId: comment.parentId,
});

export const unauthorized = () => NextResponse.json({ message: "Unauthorized" }, { status: 401 });

export const badRequest = (message: any) => NextResponse.json({ message }, { status: 400 });
