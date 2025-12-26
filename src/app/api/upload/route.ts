import { NextRequest, NextResponse } from "next/server";
import { getAuthUser, unauthorized } from "@lib/server/appApiUtils";
import { uploadBlob } from "@lib/server/blob";

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

  try {
    const url = await uploadBlob(file, "uploads");
    return NextResponse.json({ url }, { status: 201 });
  } catch (err: any) {
    console.error("Upload failed", err);
    return NextResponse.json({ message: err.message || "Upload failed" }, { status: 500 });
  }
}
