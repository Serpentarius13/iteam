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
    <aside className="overflow-y-auto  h-[85%] overflow-x-hidden min-w-[25rem]  pr-[2rem] border-r-2 border-solid border-light-blue flex flex-col justify-between items-center relative">
      <ul className="flex-col flex gap-[1rem] max-h-[80%] overflow-y-auto">
        {friends?.length &&
          friends.map((friend) => (
            <li key={friend.id}>
              <Link
                href={
                  leadingToFriends
                    ? `/profile/friends/${friend.id}`
                    : `/profile/chat/${friend.chat}`
                }
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
      {children}
    </aside>
  );
}
