import clsx from "clsx";

import Image from "next/image";

interface IChatMessageProps {
  text: string;
  avatar: string;
  name: string;
  createdAt: Date;
  isReverse?: boolean;
}

export default function ChatMessage({
  name,

  text,
  avatar,
  createdAt,
  isReverse = false,
}: IChatMessageProps) {
  return (
    <>
      <div
        className={clsx(` relative self-start  flex flex-col gap-[1rem]`, {
          "self-end": isReverse,
        })}
      >
        <div
          className={clsx(" flex items-end gap-[1rem] ", {
            "flex-row-reverse": isReverse,
          })}
        >
          <Image
            src={avatar}
            alt={isReverse ? "Your avatar" : `${name}'s avatar`}
            width={36}
            height={36}
            className="w-[3.6rem] self-end aspect-square rounded-full borderline"
          />
          <p className="bg-transparent text-white borderline rounded-lg p-[1rem] flex   items-center justify-center text-[1.6rem]  max-w-[30rem] break-words">
            {text}
          </p>
        </div>

        <p className="text-[1rem] text-light-gray w-full  text-start">
          Sent at {new Date(createdAt).toLocaleTimeString()}
        </p>
      </div>
    </>
  );
}
