import "../assets/main.scss";
import { Monda } from "next/font/google";

import Providers from "@/components/Providers";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Shared/Navbar"));
const Footer = dynamic(() => import("@/components/Shared/Footer"));



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
  return (
    <html lang="en">
      <body className={`${monda.className} bg-darkest-blue`}>
        <Providers>
          <Navbar  />
          <main className="flex  flex-col gap-[4rem] overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
