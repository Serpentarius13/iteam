"use client";

import { createMessage } from "@/features/services/createMessageDto";
import { Message } from "@/lib/types/utility";
import { useRef, useState } from "react";
import Button from "../Shared/Buttons/Button";

import { useSession } from "next-auth/react";
import LoadingScreen from "../Shared/Load/LoadingScreen";
import { generateUUID } from "three/src/math/MathUtils";

import Image from "next/image";
import axios from "axios";
import { Session } from "next-auth/core/types";

import { useParams } from "next/navigation";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/features/services/toaster";
import LoadingButton from "../Shared/Buttons/LoadingButton";

export default function Chat({
  messages: fetchedMessages,
  roomId,
  session,
}: {
  messages: Message[];
  roomId: string;
  session: Session;
}) {
  const [messages, setMessages] = useState<Message[]>(fetchedMessages);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      if (!inputRef?.current?.value) return;
      const { data: message } = await axios.patch("/api/chat", {
        text: inputRef.current.value,
        roomId: roomId,
      });
      setMessages([message, ...messages]);
    },
    mutationKey: ["message"],
    onError() {
      toaster.error("There was an error sending your message");
    },
  });

  return (
    <div className="p-[2rem] w-full h-[60rem] bg-white borderline rounded-small flex-col flex gap-[1.4rem] justify-between ">
      <div className="py-[1rem] px-[2.5rem] flex-col-reverse flex flex-1 gap-[1.4rem] overflow-y-scroll">
        {messages.map((message) =>
          message.userId == session.user.id ? (
            <div
              key={message.id}
              className=" relative self-end flex flex-col gap-[1rem]"
            >
              <div className=" flex items-end gap-[1rem] ">
                <p className="bg-white borderline rounded-lg p-[1rem] flex   items-center justify-center text-[1.6rem]">
                  {message.text}
                </p>

                <Image
                  src={message.avatar}
                  alt={`Your avatar`}
                  width={36}
                  height={36}
                  className="w-[3.6rem] self-end aspect-square rounded-full borderline"
                />
              </div>

              <p className="text-[1rem] text-light-gray w-full  text-end">
                Sent at {new Date(message.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ) : (
            <div
              key={message.id}
              className=" relative self-start flex flex-col gap-[1rem]"
            >
              <div className=" flex items-end gap-[1rem] ">
                <Image
                  src={message.avatar}
                  alt={`Your avatar`}
                  width={36}
                  height={36}
                  className="w-[3.6rem] self-end aspect-square rounded-full borderline"
                />
                <p className="bg-white borderline rounded-lg p-[1rem] flex   items-center justify-center text-[1.6rem]">
                  {message.text}
                </p>
              </div>

              <p className="text-[1rem] text-light-gray w-full  text-start">
                Sent at {new Date(message.createdAt).toLocaleTimeString()}
              </p>
            </div>
          )
        )}
      </div>
      <div className="flex pt-auto gap-[1rem]">
        <input
          type="text"
          className="borderline p-[1rem] w-full"
          ref={inputRef}
        />

        <LoadingButton
          onClick={() => mutate()}
          isLoading={isLoading}
          text="Send"
        />
      </div>
    </div>
  );
}
