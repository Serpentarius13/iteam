import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/Header"));
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
