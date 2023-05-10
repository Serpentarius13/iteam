"use client";

import LoadingScreen from "@/components/Shared/Load/LoadingScreen";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/dist/client/components/navigation";
import Image from "next/image";
import Link from "next/link";

import ChatComponent from "@/components/Chat/ChatComponent";
import { ReactNode } from "react";
import FriendsSidebar from "@/components/ProfileFriendsSidebar/FriendsSidebar";
import { SidebarFriend } from "@/lib/types/utility";

export default function ChatLayout({ children }: { children: ReactNode }) {
  const { data: friends, isLoading } = useQuery<SidebarFriend[]>({
    queryFn: async () => {
      const { data } = await axios.get("/api/friends");
      return data;
    },
    queryKey: ["friends"],
  });

  return (
    <main className="h-full w-full flex items-start justify-between">
      <FriendsSidebar friends={friends ?? []}>
        <LoadingScreen isLoading={isLoading} />
      </FriendsSidebar>

      <div className="pl-[5rem] w-full h-full">{children}</div>
    </main>
  );
}
