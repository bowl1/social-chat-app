"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileScreen from "@features/profile/ProfileScreen";
import { useUserStore } from "store/useUserStore";

export default function ProfilePage() {
  const user = useUserStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;
  return <ProfileScreen />;
}
