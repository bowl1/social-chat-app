import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/server/prisma";
import { getAuthUser, unauthorized } from "@lib/server/appApiUtils";
import { userUpdateSchema } from "@types/schemas";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest) {
  const firebaseUser = await getAuthUser(req);
  if (!firebaseUser) return unauthorized();

  const body = await req.json();
  const parsed = userUpdateSchema.safeParse(body || {});
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { firebaseUid: firebaseUser.uid },
  });
  if (!dbUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const updated = await prisma.user.update({
    where: { id: dbUser.id },
    data: parsed.data,
  });

  return NextResponse.json({ user: updated });
}
