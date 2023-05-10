import { authOptions } from "@/lib/auth";
import { FileWarning } from "lucide-react";

import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const ChatComponent = dynamic(() => import("@/components/Chat/ChatComponent"));

export const revalidate = 60;

export default async function Chat({
  params,
}: {
  params: { couserId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Unauthorized");

  const messages = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/chat/2101ae6e-6399-4712-800e-3a18295bbb9f+${session!.user.id}`
  ).then((res) => res.json());

  return (
    <div className="w-screen h-screen pt-[20rem] flex items-center justify-center">
      {session && messages ? (
        <ChatComponent session={session} messages={messages} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-[2rem]">
          <FileWarning />

          <p className="text-[1.8rem] text-red-700 font-bold">
            There was an error loading your chat. Try again later
          </p>
        </div>
      )}
    </div>
  );
}
