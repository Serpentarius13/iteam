import { SidebarFriend } from "@/lib/types/utility";
import Image from "next/image";
import Link from "next/link";

interface IFriendsSidebarProps {
  friends: SidebarFriend[];
  children?: React.ReactNode;
  leadingToFriends?: boolean;
}

export default function FriendsSidebar({
  friends,
  children,
  leadingToFriends = false,
}: IFriendsSidebarProps) {
  console.log(friends);
  return (
    <aside className="relative  flex h-[85%] min-w-[25rem]  flex-col items-center justify-between overflow-y-auto overflow-x-hidden border-r-2 border-solid border-light-blue pr-[2rem] lg:min-w-[20rem] md:min-w-[15rem]">
      <ul className="flex max-h-[80%] flex-col gap-[1rem] overflow-y-auto w-full">
        {friends?.length &&
          friends.map((friend) => (
            <li key={friend.id}>
              <Link
                href={
                  leadingToFriends
                    ? `/profile/friends/${friend.id}`
                    : `/profile/chat/${friend.chat}`
                }
                className="flex cursor-pointer items-center gap-[2rem]"
              >
                <Image
                  src={friend.image as string}
                  alt={`${friend.name}'s avatar`}
                  width={50}
                  height={50}
                  className="aspect-square w-[5rem] rounded-full"
                />

                <div className="flex flex-col text-white">
                  <h4 className="text-[1.7rem]">{friend.name}</h4>

                  <span className="text-[1.5rem]">{friend.profession}</span>
                </div>
              </Link>
            </li>
          ))}
      </ul>
      {children}
    </aside>
  );
}
