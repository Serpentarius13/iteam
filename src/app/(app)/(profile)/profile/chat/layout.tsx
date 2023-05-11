import LoadingScreen from "@/components/Shared/Load/LoadingScreen";

import { ReactNode } from "react";
import FriendsSidebar from "@/components/Profile/FriendsSidebar";

async function getFriends() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/friends`);

  if (response.ok) {
    return await response.json();
  } else return null;
}

export default async function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  const friends = await getFriends();
  return (
    <main className="flex h-full w-full items-start justify-between">
      <FriendsSidebar friends={friends ?? []}></FriendsSidebar>

      <div className="h-full w-full pl-[5rem]">{children}</div>
    </main>
  );
}
