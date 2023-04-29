import About from "@/components/About";
import Actions from "@/components/Actions";
import Header from "@/components/Header";
import WIP from "@/components/WIP";
import { Metadata } from "next";

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <Actions />
      <WIP />
    </>
  );
}
