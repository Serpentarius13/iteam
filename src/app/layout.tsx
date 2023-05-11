import "../assets/main.scss";
import { Monda } from "next/font/google";

import Providers from "@/components/Providers";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Shared/Navbar"));
const Footer = dynamic(() => import("@/components/Shared/Footer"));

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const monda = Monda({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "ITeam - find your partner!",
  description:
    "ITeam is the first and best service for finding your dream team in informational technologies field! Get yourself some mates and make an innovative application together!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${monda.className} bg-darkest-blue`}>
        <Providers>
          <Navbar session={session} />
          <main className="overflow-x-hidden  flex flex-col gap-[4rem]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
