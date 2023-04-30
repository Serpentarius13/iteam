"use client";

import { buttonVariants } from "@/components/Shared/Buttons/Button";
import LoadingScreen from "@/components/Shared/Load/LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { User } from "@prisma/client";

export default function FriendsLayout({ children }: { children: ReactNode }) {
  const { data: friends, isLoading } = useQuery<
    {
      friend: Pick<User, "image" | "email" | "id" | "name" | "profession">;
    }[]
  >({
    queryFn: async () => {
      const { data } = await axios.get("/api/friends");
      return data;
    },
  });

  return (
    <section className="flex justify-between items-start w-full h-full">
      <aside className="h-[90%] min-w-[25rem]  pr-[5rem] border-r-2 border-solid border-light-blue flex flex-col justify-between items-center">
        <ul className="flex-col flex gap-[1rem]">
          {friends?.length &&
            friends.map(({ friend }) => (
              <li
                className="flex gap-[2rem] items-center cursor-pointer"
                key={friend.id}
              >
                <Link href="/">
                  <Image
                    src={friend.image as string}
                    alt={`${friend.name}'s avatar`}
                    width={50}
                    height={50}
                    className="w-[5rem] aspect-square rounded-full"
                  />
                </Link>

                <div className="flex flex-col text-white">
                  <h4 className="text-[1.7rem]">{friend.name}</h4>

                  <span className="text-[1.5rem]">{friend.profession}</span>
                </div>
              </li>
            ))}
        </ul>
        <Link
          href="/profile/friends/requests"
          className={`${buttonVariants({ variant: "default" })} `}
        >
          Friend requests
        </Link>

        <LoadingScreen isLoading={isLoading} />
      </aside>

      {children}
    </section>
  );
}
