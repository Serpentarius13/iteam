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
    <main className="w-screen h-screen flex items-center justify-between center lg:flex-col gap-[10rem] lg:gap-[4rem]  pt-[20rem] relative ">
      <ProfileInfo session={session} />
      <div className="w-full h-full border-2 border-solid border-light-blue flex flex-col gap-[4.4rem] items-center py-[2.4rem] px-[11rem]">
        <ProfileNav />
        {children}
      </div>
    </main>
  );
}
