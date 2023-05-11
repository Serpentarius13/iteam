import ChatComponent from "@/components/Chat/ChatComponent";
import CreateChat from "@/components/Chat/CreateChat";
import { authOptions } from "@/lib/auth";
import { ChatRoom } from "@/lib/types/utility";
import { FileWarning } from "lucide-react";

import { getServerSession } from "next-auth";

export const revalidate = 0;

export default async function Chat({ params }: { params: { chatId: string } }) {
  const chatRoom: ChatRoom = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${params.chatId}`
  ).then((res) => res.json());

  const session = await getServerSession(authOptions);

  return (
    <div className="w-full h-full items-center justify-center">
      {chatRoom.exists && session && (
        <ChatComponent
          messages={chatRoom.messages}
          roomId={params.chatId}
          session={session}
        />
      )}
    </div>
  );
}
