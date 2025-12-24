import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/server/prisma";
import { ensureDefaultGroup } from "@lib/server/appApiUtils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await ensureDefaultGroup();
  const guest = req.nextUrl.searchParams.get("guest") === "true";
  const groups = await prisma.group.findMany({
    where: guest ? { isDefault: true } : {},
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({
    groups: groups.map((g) => ({
      id: g.id,
      name: g.name,
      isDefault: g.isDefault,
    })),
  });
}
