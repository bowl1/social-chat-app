import { request } from "./httpClient";
import { Group } from "../types/models";

const normalizeGroup = (group: any): Group => ({
  objectId: group.id,
  name: group.name,
  isDefault: !!group.isDefault,
});

export const fetchGroups = async (isLoggedIn: boolean) => {
  const res = await request(`/groups?guest=${isLoggedIn ? "false" : "true"}`);
  return (res.groups || []).map(normalizeGroup);
};
