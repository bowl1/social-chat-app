import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getAuthUser, unauthorized } from "@lib/server/appApiUtils";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const firebaseUser = await getAuthUser(req);
  if (!firebaseUser) return unauthorized();

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ message: "File is required" }, { status: 400 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { message: "BLOB_READ_WRITE_TOKEN is not configured" },
      { status: 500 },
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const ext = file.name?.includes(".") ? file.name.split(".").pop() || "" : "";
  const filename = `${Date.now()}-${randomUUID().slice(0, 6)}${ext ? `.${ext}` : ""}`;

  const blob = await put(filename, Buffer.from(arrayBuffer), {
    access: "public",
    token,
  });

  return NextResponse.json({ url: blob.url }, { status: 201 });
}
