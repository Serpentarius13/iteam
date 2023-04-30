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

export default function ChatLayout({ children }: { children: ReactNode }) {
  const { data: friends, isLoading } = useQuery<
    {
      friend: Pick<User, "image" | "email" | "id" | "name" | "profession"> & {
        chat: string | null;
      };
    }[]
  >({
    queryFn: async () => {
      const { data } = await axios.get("/api/friends");
      return data;
    },
    queryKey: ['friends']
  });

  const params = useSearchParams();

  console.log(params);

  console.log(friends);

  return (
    <main className="h-full w-full flex justify-between">
      <aside className="overflow-y-auto max-h-full overflow-x-hidden w-[25rem]  mr-[5rem] border-r-2 border-solid border-light-blue flex flex-col justify-between items-center">
        <ul className="flex-col flex gap-[1rem]">
          {friends?.length &&
            friends.map(({ friend }) => (
              <li key={friend.id}>
                <Link
                  href={`/profile/chat/${friend.chat}`}
                  className="flex gap-[2rem] items-center cursor-pointer"
                >
                  <Image
                    src={friend.image as string}
                    alt={`${friend.name}'s avatar`}
                    width={50}
                    height={50}
                    className="w-[5rem] aspect-square rounded-full"
                  />

                  <div className="flex flex-col text-white">
                    <h4 className="text-[1.7rem]">{friend.name}</h4>

                    <span className="text-[1.5rem]">{friend.profession}</span>
                  </div>
                </Link>
              </li>
            ))}
        </ul>

        <LoadingScreen isLoading={isLoading} />
      </aside>

      <div className="ml-[5rem] w-full h-full">{children}</div>
    </main>
  );
}
