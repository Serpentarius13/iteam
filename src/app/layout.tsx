

import Navbar from "@/components/Shared/Navbar";
import "../assets/main.scss";
import { Monda } from "next/font/google";
import Footer from "@/components/Shared/Footer";
import Providers from "@/components/Providers";

const monda = Monda({ subsets: ["latin"], weight: ["400", "700"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${monda.className} bg-darkest-blue`}>
        <Providers>
          <Navbar />
          <main className="overflow-x-hidden  flex flex-col gap-[4rem]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
