"use client";

import { Message } from "@/lib/types/utility";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { Session } from "next-auth/core/types";

import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/features/services/toaster";
import LoadingButton from "../Shared/Buttons/LoadingButton";
import ChatMessage from "./ChatMessage";

import { pusherClient } from "@/lib/pusher";

export default function Chat({
  messages: fetchedMessages = [],
  roomId,
  session,
}: {
  messages?: Message[];
  roomId?: string;
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

  useEffect(() => {
    const channel = pusherClient.subscribe(`chat-${roomId}`);

    channel.bind("message", (data: Message) => {
      if (data.userId !== session.user.id)
        setMessages((prev) => [data, ...prev]);
    });

    return () => channel.unsubscribe();
  }, []);

  return (
    <div className="p-[2rem] w-full h-[60rem] bg-darkest-blue borderline rounded-small flex-col flex gap-[1.4rem] justify-between max-h-[85%] ">
      <div className="py-[1rem] px-[2.5rem] flex-col-reverse flex flex-1 gap-[1.4rem] overflow-y-scroll w-full">
        {messages.map((message) => (
          <ChatMessage
            name={message.name}
            text={message.text}
            avatar={message.avatar}
            createdAt={message.createdAt}
            isReverse={message.userId === session.user.id}
            key={message.id}
          />
        ))}
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
