import { request } from "./httpClient";

export const upsertAuthUser = async (body: any) => {
  const res = await request("/auth/me", {
    method: "POST",
    body,
  });
  return res.user;
};

export const updateUserProfile = async (body: any) => {
  const res = await request("/users/me", {
    method: "PATCH",
    body,
  });
  return res.user;
};
