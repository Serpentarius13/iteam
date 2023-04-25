import SectionSkeleton from "@/components/Shared/SectionSketeton";
import Image from "next/image";

interface IActionCard {
  icon: string;
  iconAlt: string;
  text: string;
  title: string;
}

const ActionCard: React.FC<IActionCard> = ({ icon, text, title, iconAlt }) => {
  return (
    <figure className="flex flex-col gap-[2.4rem] items-center group w-[32rem] cursor-pointer pt-[2rem]">
      <Image src={icon} alt={iconAlt} width={50} height={28} className="w-[5rem] h-[2.8rem]" />

      <h4 className="font-bold text-white text-[2.4rem]">{title}</h4>

      <div className=" transition-all opacity-0 group-hover:opacity-100 relative ">
        <Image
          src="/icons/actions/triangle.svg"
          alt="Triangle"
          width={48}
          height={32}
          className="absolute -top-[2rem] ] left-1/2 -translate-x-1/2"
        />
        <p className="shadow-light-blue p-[2.4rem] z-10 block relative bg-light-blue  rounded-small text-[1.4rem]">
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
    title: "Practice your stuff",
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
      <div className="flex justify-between flex-wrap md:items-center md:justify-center md:gap-[2rem] pb-[5rem] items-start">
        {actionCards.map((card) => (
          <ActionCard {...card} key={card.title} />
        ))}
      </div>
    </SectionSkeleton>
  );
}
