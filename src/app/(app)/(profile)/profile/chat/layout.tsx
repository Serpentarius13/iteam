"use client";

import LoadingScreen from "@/components/Shared/Load/LoadingScreen";

import { ReactNode } from "react";
import FriendsSidebar from "@/components/Profile/FriendsSidebar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SidebarFriend } from "@/lib/types/utility";

export const revalidate = 0;

export default function ChatLayout({ children }: { children: ReactNode }) {
  const { data: friends, isLoading } = useQuery<SidebarFriend[]>({
    queryFn: async () => {
      const { data } = await axios.get("/api/friends");
      return data;
    },
    queryKey: ["friends"],
  });

  return (
    <main className="flex h-full w-full items-start justify-between">
      <FriendsSidebar friends={friends ?? []}></FriendsSidebar>

      <div className="h-full w-full pl-[5rem]">{children}</div>
    </main>
  );
}
