import SectionSkeleton from "@/components/Shared/SectionSketeton";
import Image from "next/image";
import Aura from "./Shared/Absolutes/Aura";
import BigStar from "./Shared/Absolutes/BigStar";

interface IActionCard {
  icon: string;
  iconAlt: string;
  text: string;
  title: string;
}

const ActionCard: React.FC<IActionCard> = ({ icon, text, title, iconAlt }) => {
  return (
    <figure className="group flex w-[32rem] cursor-pointer select-none flex-col items-center gap-[2.4rem]  pt-[2rem]">
      <Image
        src={icon}
        alt={iconAlt}
        className="h-[2.8rem] w-[5rem]"
        width="0"
        height="0"
      />

      <h4 className="text-[2.4rem] font-bold text-white">{title}</h4>

      <div className=" relative opacity-0 transition-all group-hover:opacity-100 ">
        <Image
          src="/icons/actions/triangle.svg"
          alt="Triangle"
          width={48}
          height={32}
          className="] absolute -top-[2rem] left-1/2 -translate-x-1/2"
        />
        <p className="relative z-10 block rounded-small bg-light-blue p-[2.4rem]  text-[1.4rem] shadow-light-blue">
          {text}
        </p>
      </div>
    </figure>
  );
};

const actionCards: IActionCard[] = [
  {
    icon: "/icons/actions/smile.svg",
    iconAlt: "Smile icon",
    text: "Make new relatives and discuss fresh technology, upcoming hackatons and funny memes.",
    title: "Expand your circle",
  },
  {
    icon: "/icons/actions/lamp.svg",
    iconAlt: "Electric lamp with checkmark icon",
    text: "Talk about your issues and bugs together on comfortable tech forum with experienced developers.",
    title: "Solve problems together",
  },
  {
    icon: "/icons/actions/connection.svg",
    iconAlt: "Mouse connecting to code icon",
    text: "Find your perfect partner to build innovative apps without learning new technologies.",
    title: "Practice your thing",
  },
  {
    icon: "/icons/actions/search.svg",
    iconAlt: "Searching for people magnifying glass icon",
    text: "Use smart filtering search to choose the most suiting partner for yourself.",
    title: "Befriend the best",
  },
];

export default function Actions() {
  return (
    <SectionSkeleton title="Actions">
      <div className="flex flex-wrap items-start justify-between pb-[5rem] md:items-center md:justify-center md:gap-[2rem]">
        {actionCards.map((card) => (
          <ActionCard {...card} key={card.title} />
        ))}
      </div>

      <div className="absolute -left-1/3 -top-[75%] -z-[1] lg:bottom-0 lg:top-auto">
        <Aura />
      </div>
      <div className="absolute left-0 top-1/2">
        <BigStar />
      </div>
    </SectionSkeleton>
  );
}
