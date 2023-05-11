import SectionSkeleton from "@/components/Shared/SectionSketeton";
import Image from "next/image";

import boy from "../../public/img/about/boy.png";
import girl from "../../public/img/about/girl.png";
import ring from "../../public/img/about/ring.png";

import Links from "@/components/Shared/Absolutes/Links";
import Aura from "./Shared/Absolutes/Aura";
import Circle from "./Shared/Absolutes/Circle";
import LinkCircle from "./Shared/Absolutes/LinkCircle";
import BigStar from "./Shared/Absolutes/BigStar";
import Rhombus from "./Shared/Absolutes/Rhombus";

export default function About() {
  return (
    <SectionSkeleton title="About">
      <div className="flex min-h-[110rem] w-full justify-between xl:flex-col xl:gap-[30rem]">
        <div className="flex w-[50%] flex-col gap-[5rem] text-start text-[2.4rem] text-white xl:w-[95%]">
          <p>ITeam is the worlds first IT team search service.</p>
          <p>
            We are a start-up, ready to solve all your problems with the lack of
            associates in your favorite profession. Our service offers an
            individual approach and a high-precision algorithm for the selection
            of professionals, which will allow you to find the best assistants
            in the implementation of your project.
          </p>
          <p>
            Thanks to our extensive database of talented professionals, you can
            instantly assemble a team and make your dreams come true
          </p>
        </div>

        <div className="relative  flex flex-1 gap-[2rem] xl:ml-[10rem] xl:max-w-[80%] xl:pt-[10rem] lg:ml-[6rem] md:ml-[3rem]">
          <Image
            src={boy}
            alt="A boy with laptop in hands"
            className="absolute bottom-[20%] left-[15%]  max-w-[45%] "
          />

          <Image
            src={ring}
            alt="A cybernetic focus ring effect"
            className="absolute bottom-1/4 left-1/2 -z-[1] -translate-x-1/2 2xl:w-[50rem] lg:w-[40rem]"
            width="0"
            height="0"
          />
          <Image
            src={girl}
            alt="A girl with laptop in hands"
            className="absolute bottom-[20%] right-[15%] max-w-[35%]"
          />

          <div className="absolute -left-[30%] top-1/2 -z-[1] -translate-y-1/3 lg:-left-[65%] lg:top-1/3">
            <Aura />
          </div>
        </div>
      </div>

      <div className="absolute -left-[5%] -top-[22%] -rotate-[20]">
        <Links />
      </div>

      <div className="absolute left-0 top-[60%] ">
        <Rhombus />
      </div>

      <div className="absolute left-[55%] top-[20%] -z-[1] -translate-y-1/2 -rotate-90">
        <Links />
      </div>

      <div className="absolute right-0 top-0 -z-[1] -rotate-45 lg:-top-[15%]">
        <LinkCircle />
      </div>

      <div className="absolute right-0 top-[60%]">
        <BigStar />
      </div>

      <div className="absolute right-[2%] top-[85%]">
        <Rhombus />
      </div>
    </SectionSkeleton>
  );
}
