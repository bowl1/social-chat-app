import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/server/prisma";
import { ensureDefaultGroup, getAuthUser, unauthorized } from "@lib/server/appApiUtils";
import { authMeSchema } from "../../../../types/schemas";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const firebaseUser = await getAuthUser(req);
  if (!firebaseUser) return unauthorized();

  const body = await req.json();
  const parsed = authMeSchema.safeParse(body || {});
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });
  }

  const { username, avatar, gender, language, country, email: bodyEmail } = parsed.data;
  const email = firebaseUser.email || bodyEmail;
  if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

  await ensureDefaultGroup();

  const fallbackUsername = username || email.split("@")[0] || "user";

  const user = await prisma.user.upsert({
    where: { firebaseUid: firebaseUser.uid },
    update: {
      email,
      username: username || fallbackUsername,
      avatar,
      gender,
      language,
      country,
    },
    create: {
      firebaseUid: firebaseUser.uid,
      email,
      username: fallbackUsername,
      avatar,
      gender,
      language,
      country,
    },
  });

  return NextResponse.json({ user });
}
