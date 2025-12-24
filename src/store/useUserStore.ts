import { create } from "zustand";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@lib/client/firebase";
import { fetchGroups } from "@client/groupsApi";
import { request } from "@client/httpClient";
import { UserProfile, Group } from "@types/models";

type UserState = {
  user: UserProfile | null;
  selectedGroup: Group | null;
  groupData: Group[];
  avatar: string;
  setUser: (user: UserProfile | null) => void;
  setSelectedGroup: (group: Group | null) => void;
  setAvatar: (avatar: string) => void;
  restoreOrFetchDefaultGroup: () => Promise<void>;
  logoutUser: () => Promise<void>;
  startAuthListener: () => () => void;
};

const defaultAvatar = "/default-avatar.png";

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  selectedGroup: null,
  groupData: [],
  avatar: defaultAvatar,
  setUser: (user) => set({ user }),
  setSelectedGroup: (group) => set({ selectedGroup: group }),
  setAvatar: (avatar) => set({ avatar }),
  pickValidGroup: (groups: Group[], saved: string | null) => {
    let selected: Group | null = null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Group;
        selected = groups.find((g) => g.objectId === parsed.objectId) || null;
      } catch (e) {
        selected = null;
      }
    }
    if (!selected) {
      selected = groups.find((g) => g.isDefault) || groups[0] || null;
    }
    if (selected) {
      localStorage.setItem("selectedGroup", JSON.stringify(selected));
    } else {
      localStorage.removeItem("selectedGroup");
    }
    return selected;
  },

  restoreOrFetchDefaultGroup: async () => {
    const groups = await fetchGroups(true);
    set({ groupData: groups });
    const savedGroup = localStorage.getItem("selectedGroup");
    const selected = (get() as any).pickValidGroup(groups, savedGroup);
    set({ selectedGroup: selected });
  },

  logoutUser: async () => {
    const savedGroup = localStorage.getItem("selectedGroup");
    await signOut(auth);
    localStorage.removeItem("authToken");
    set({
      user: null,
      avatar: defaultAvatar,
      selectedGroup: null,
    });
    localStorage.clear();
    if (savedGroup) {
      localStorage.setItem("selectedGroup", savedGroup);
    }
    try {
      const groups = await fetchGroups(false);
      set({ groupData: groups });
      const defaultGroup = groups.find((g) => g.isDefault);
      if (defaultGroup) set({ selectedGroup: defaultGroup });
    } catch (error) {
      console.error("Error fetching default group:", error);
    }
  },

  startAuthListener: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          localStorage.setItem("authToken", token);
          const res = await request("/auth/me", {
            method: "POST",
            body: {
              username: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "user",
              email: firebaseUser.email,
              avatar: firebaseUser.photoURL,
            },
          });
          const currentUser = res.user as UserProfile;
          set({
            user: currentUser,
            avatar: currentUser.avatar || defaultAvatar,
          });
          await get().restoreOrFetchDefaultGroup();
        } catch (error) {
          console.error("Error loading user:", error);
          localStorage.removeItem("authToken");
          set({
            user: null,
            avatar: defaultAvatar,
            selectedGroup: null,
          });
          try {
            const groups = await fetchGroups(false);
            set({ groupData: groups });
            const defaultGroup = groups.find((g) => g.isDefault);
            if (defaultGroup) set({ selectedGroup: defaultGroup });
          } catch (e) {
            console.error("Error fetching default group:", e);
          }
        }
      } else {
        localStorage.removeItem("authToken");
        set({
          user: null,
          avatar: defaultAvatar,
          selectedGroup: null,
        });
        try {
          const groups = await fetchGroups(false);
          set({ groupData: groups });
          const defaultGroup = groups.find((g) => g.isDefault);
          if (defaultGroup) set({ selectedGroup: defaultGroup });
        } catch (e) {
          console.error("Error fetching default group:", e);
        }
      }
    });
    return unsubscribe;
  },
}));
