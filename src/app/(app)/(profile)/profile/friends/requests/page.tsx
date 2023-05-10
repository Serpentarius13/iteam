"use client";

import LoadingScreen from "@/components/Shared/Load/LoadingScreen";
import { FriendRequest } from "@/lib/types/utility";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Check, X } from "lucide-react";

import Image from "next/image";

export default function FriendRequests() {
  const { data, isLoading, refetch } = useQuery<FriendRequest[]>({
    queryFn: async () => {
      const { data } = await axios.get("/api/request");
      return data;
    },
  });



  const { mutate, isLoading: isHandleRequestLoading } = useMutation({
    mutationFn: async ({
      accept,
      userId,
    }: {
      accept: boolean;
      userId: string;
    }) => {
      await axios.post(`/api/request/`, { accept, userId });
      refetch();
    },
  });

  console.log(data)
  return (
    <section className="w-full h-full pl-[5rem] flex flex-wrap items-start text-white relative">
      {data?.map((request) => (
        <figure className="flex items-center gap-[1rem]" key={request.name}>
          <Image
            src={request.image}
            alt={`${request.name}'s avatar`}
            width={48}
            height={48}
            className="w-[4.8rem] aspect-square rounded-full"
          />

          <p className="text-[1.7rem] text-white font-bold ">{request.name}</p>

          <button
            title="Accept friend request"
            onClick={() => mutate({ accept: true, userId: request.friendId })}
          >
            <Check color="#75D9FF" size={48} />
          </button>
          <button
            title="Accept friend request"
            onClick={() => mutate({ accept: false, userId: request.friendId })}
          >
            <X color="#ef4444" size={48} />
          </button>
        </figure>
      ))}

      <LoadingScreen isLoading={isHandleRequestLoading || isLoading} />
    </section>
  );
}
