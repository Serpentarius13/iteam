import dynamic from "next/dynamic";
import Header from "@/components/Header";

const Actions = dynamic(() => import("@/components/Actions"));
const About = dynamic(() => import("@/components/About"));
const WIP = dynamic(() => import("@/components/WIP"));

export default function Home() {
  return (
    <div className="lg:mt-[12rem] mb-[8rem]">
      <Header />
      <About />
      <Actions />
      <WIP />
    </div>
  );
}
