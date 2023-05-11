import { ReactNode } from "react";

import { getServerSession } from "next-auth/next";

import dynamic from "next/dynamic";
import { authOptions } from "@/lib/auth";

const ProfileInfo = dynamic(() => import("@/components/Profile/ProfileInfo"));

const ProfileNav = dynamic(() => import("@/components/Profile/ProfileNav"));

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <main className="center relative flex h-screen w-screen items-center justify-between gap-[10rem] pt-[20rem]  md:flex-col lg:items-start  lg:gap-[4rem] ">
      <ProfileInfo session={session} />
      <div className="flex h-full w-full flex-col items-center gap-[4.4rem] border-2 border-solid border-light-blue px-[11rem] py-[2.4rem] lg:px-[8rem] md:px-[4.5rem]">
        <ProfileNav />
        {children}
      </div>
    </main>
  );
}
