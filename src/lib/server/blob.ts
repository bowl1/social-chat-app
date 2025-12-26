import { put, del } from "@vercel/blob";
import { randomUUID } from "crypto";

const token = process.env.BLOB_READ_WRITE_TOKEN;

export async function uploadBlob(file: File, prefix = "") {
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured");

  const arrayBuffer = await file.arrayBuffer();
  const ext = file.name?.includes(".") ? file.name.split(".").pop() || "" : "";
  const safePrefix = prefix ? prefix.replace(/\/+$/, "") + "/" : "";
  const filename = `${safePrefix}${Date.now()}-${randomUUID().slice(0, 6)}${ext ? `.${ext}` : ""}`;

  const blob = await put(filename, Buffer.from(arrayBuffer), {
    access: "public",
    token,
  });

  return blob.url;
}

export async function deleteBlobs(urls: (string | null | undefined)[]) {
  if (!token) return;
  // filter out invalid URLs
  const targets = urls.filter((url): url is string => !!url && url.startsWith("https://"));
  if (!targets.length) return;

  // delete in parallel, but wait for all to complete, quicker than sequentially
  await Promise.all(
    targets.map((url) =>
      // not throwing on failure to avoid blocking other deletions
      del(url, { token }).catch((err) => {
        console.warn("Failed to delete blob", url, err);
      }),
    ),
  );
}
