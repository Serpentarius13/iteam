'use client'

import Link from "next/link";

import { usePathname } from "next/navigation";

type TLink = { text: string; slug: string };

const routerLinks: TLink[] = [
  { text: "Friends", slug: "friends" },
  { text: "Chat", slug: "chat" },
];

export default function ProfileNav() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-[3rem] text-white text-[1.7rem]">
      {routerLinks.map((link) => (
        <li key={link.slug}>
          <Link
            href={`/profile/${link.slug}`}
            className={`${
              pathname?.includes(link.slug)
                ? "bg-light-blue text-black"
                : "bg-transparent text-white hover:bg-lightest-blue hover:text-black"
            } transition-all p-[1rem] rounded-small`}
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
