import { auth } from "@lib/client/firebase";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

const getToken = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    return await currentUser.getIdToken();
  }
  return localStorage.getItem("authToken");
};

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
};

export const request = async (path, options: RequestOptions = {}) => {
  const { method = "GET", headers = {}, body } = options;
  const token = await getToken();
  const isFormData = body instanceof FormData;

  const finalHeaders = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: finalHeaders,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const raw = payload?.message || `Request failed with ${response.status}`;
    const message = typeof raw === "string" ? raw : JSON.stringify(raw);
    throw new Error(message);
  }

  return payload;
};

export { API_BASE };
