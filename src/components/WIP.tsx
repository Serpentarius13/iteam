import SectionSkeleton from "@/components/Shared/SectionSketeton";
import Image from "next/image";

interface IWIPCategory {
  isReverse?: boolean;
  title: string;
  icon: string;
  iconAlt: string;
  img: string;
  imgAlt: string;
  text: string;
}

const WIPCategory = ({
  isReverse = false,
  title,
  icon,
  iconAlt,
  img,
  imgAlt,
  text,
}: IWIPCategory) => {
  return (
    <div
      className={`flex justify-between min-h-[90rem] relative items-center ${
        isReverse ? "flex-row-reverse" : ""
      } lg:flex-col lg:gap-[3rem] lg:min-h-[60rem]`}
    >
      <div
        className={`flex flex-col gap-[2rem] max-w-[60%] lg:max-w-[90%] ${
          isReverse && "items-end "
        } lg:items-center`}
      >
        <div className="flex gap-[3.3rem] ">
          <Image width={48} height={48} src={icon} alt={iconAlt} />
          <h3
            className={`text-white text-[3.6rem] font-bold ${
              isReverse && "text-end "
            }`}
          >
            {title}
          </h3>
        </div>
        <p
          className={`text-[2.4rem] text-white ${
            isReverse && "text-end "
          } lg:text-center`}
        >
          {text}
        </p>
      </div>

      <div className="max-w-[95%] h-full">
        <Image width={900} height={900} src={img} alt={imgAlt} />
      </div>

     
    </div>
  );
};

const ChatWIP: IWIPCategory = {
  icon: "/icons/wip/chat.svg",
  iconAlt: "Chat icon",
  img: "/img/wip/chat.png",
  imgAlt: "A man and woman standing and talking",
  text: "Communicate directly in the application without switching to other instant messengers or social networks. Our chat is equipped with a stable connection and instant delivery of messages for which you will receive urgent notifications!",
  title: "Chat",
};
const ForumWIP: IWIPCategory = {
  icon: "/icons/wip/forum.svg",
  iconAlt: "A monitor with a wrench icon",
  img: "/img/wip/forum.png",
  imgAlt:
    "Two men in science clothing standing and discussing a problem on digital whiteboard",
  text: "Communicate directly in the application without switching to other instant messengers or social networks. Our chat is equipped with a stable connection and instant delivery of messages for which you will receive urgent notifications!",
  title: "Forum",
};
const BlogWIP: IWIPCategory = {
  icon: "/icons/wip/blog.svg",
  iconAlt: "Chat icon",
  img: "/img/wip/blog.png",
  imgAlt: "A girl is writing in beside her desk with a flashlight",
  text: "Communicate directly in the application without switching to other instant messengers or social networks. Our chat is equipped with a stable connection and instant delivery of messages for which you will receive urgent notifications!",
  title: "Blog",
};

export default function WIP() {
  return (
    <SectionSkeleton title="Work in progress">
      <div className="flex flex-col gap-[5rem] relative">
        <WIPCategory {...ChatWIP}/>
        <WIPCategory {...ForumWIP} isReverse/>
        <WIPCategory {...BlogWIP}/>
        <div className="absolute w-[105%] h-[102%] px-12 bg-opacity-25 bg-gray-800  absolute-center rounded-small" />
      </div>

    </SectionSkeleton>
  );
}
