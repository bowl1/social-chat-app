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

// Zustand store for user state management
export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  selectedGroup: null,
  groupData: [],
  avatar: defaultAvatar,
  setUser: (user) => set({ user }),
  setSelectedGroup: (group) => set({ selectedGroup: group }),
  setAvatar: (avatar) => set({ avatar }),
  // function to validate and pick a group, in case the saved group is invalid
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
      // pick default group if saved group is invalid or not found
      selected = groups.find((g) => g.isDefault) || groups[0] || null;
    }
    if (selected) {
      localStorage.setItem("selectedGroup", JSON.stringify(selected));
    } else {
      localStorage.removeItem("selectedGroup");
    }
    return selected;
  },

  // function to restore selected group from localStorage or fetch default group
  restoreOrFetchDefaultGroup: async () => {
    const groups = await fetchGroups(true);
    set({ groupData: groups });
    const savedGroup = localStorage.getItem("selectedGroup");
    const selected = (get() as any).pickValidGroup(groups, savedGroup);
    set({ selectedGroup: selected });
  },

  // function to log out user and clear state
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

  // function to start listening to auth state changes
  startAuthListener: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        //condition when user logs in
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
            // set user info
            user: currentUser,
            avatar: currentUser.avatar || defaultAvatar,
          });
          await get().restoreOrFetchDefaultGroup();
        } catch (error) {
          console.error("Error loading user:", error);
          localStorage.removeItem("authToken");
          set({
            // clear user info on error
            user: null,
            avatar: defaultAvatar,
            selectedGroup: null,
          });
          try {
            // fetch default group on error as well
            const groups = await fetchGroups(false);
            set({ groupData: groups });
            const defaultGroup = groups.find((g) => g.isDefault);
            if (defaultGroup) set({ selectedGroup: defaultGroup });
          } catch (e) {
            console.error("Error fetching default group:", e);
          }
        }
      } else {
        // condition when user logs out
        localStorage.removeItem("authToken");
        set({
          user: null,
          avatar: defaultAvatar,
          selectedGroup: null,
        });
        // fetch default group on logout
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
