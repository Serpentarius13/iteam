"use client";

import { buttonVariants } from "@/components/Shared/Buttons/Button";
import LoadingScreen from "@/components/Shared/Load/LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { User } from "@prisma/client";
import { SidebarFriend } from "@/lib/types/utility";
import FriendsSidebar from "@/components/ProfileFriendsSidebar/FriendsSidebar";


export const revalidate = 0

export default function FriendsLayout({ children }: { children: ReactNode }) {
  const { data: friends, isLoading } = useQuery<SidebarFriend[]>({
    queryFn: async () => {
      const { data } = await axios.get("/api/friends");
      return data;
    },
  });

  console.log(friends);

  return (
    <section className="flex justify-between items-start w-full h-full">
      <FriendsSidebar friends={friends ?? []} leadingToFriends>
        <Link
          href="/profile/friends/requests"
          className={`${buttonVariants({ variant: "default" })} `}
        >
          Friend requests
        </Link>

        <LoadingScreen isLoading={isLoading} />
      </FriendsSidebar>

      {children}
    </section>
  );
}
