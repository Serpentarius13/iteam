import Circle from "@/components/Shared/Absolutes/Circle";
import Button from "@/components/Shared/Button";
import Earth from "@/components/Three/Earth";
import Image from "next/image";

interface IDeveloperProps {
  image: string;
  imageAlt: string;
  name: string;
  role: string;
}

const DeveloperPopup = ({ image, imageAlt, name, role }: IDeveloperProps) => {
  return (
    <div className="group flex flex-col items-end cursor-pointer">
      <div className="opacity-0 group-hover:opacity-100 transition-all flex-col  text-black ">
        <div className="flex w-[18rem] bg-light-blue  shadow-light-blue">
          <p className="flex-1 text-end p-[0.5rem] text-[1.2rem]">
            {name}
            <br />
            {role}
          </p>

          <Image
            src={image}
            alt={imageAlt}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <Image
          src="/icons/actions/triangle.svg"
          alt="Triangle"
          width={48}
          height={32}
          className="rotate-180 ml-auto -translate-y-[0.1rem]"
        />
      </div>
      <Image
        src="/icons/header/circle.svg"
        alt="Circle"
        width={35}
        height={35}
      />
    </div>
  );
};

const estherHoward: IDeveloperProps = {
  name: "Esther Howard",
  role: "Front-end developer",
  image: "/img/header/esther.png",
  imageAlt: "A smiling man with gray beard",
};

const therriWebb: IDeveloperProps = {
  name: "Therri Webb",
  role: "UI/UX designer",
  image: "/img/header/therri.png",
  imageAlt: "A bearded guy in hat eating burger",
};

const wadeWarren: IDeveloperProps = {
  name: "Wade Warren",
  role: "Backend developer",
  image: "/img/header/wade.png",
  imageAlt: "A smiling man in blue glasses",
};

const ronaldRichards: IDeveloperProps = {
  name: "Ronald Richards",
  role: "Front-end developer",
  image: "/img/header/ronald.png",
  imageAlt: "Afro-american man laughing",
};

const albertFlores: IDeveloperProps = {
  name: "Albert Flores",
  role: "Front-end developer",
  image: "/img/header/albert.png",
  imageAlt: "Smiling latin man in hat",
};

const robertFox: IDeveloperProps = {
  name: "Robert Fox",
  role: "Backend developer",
  image: "/img/header/robert.png",
  imageAlt: "A bearded man in glasses and nice shirt",
};

export default function Test() {
  return (
    <header className="center w-full h-screen flex  justify-center lg:flex-col">
      <div className="flex flex-col gap-[3rem] text-white flex-1 text-[3.6rem] justify-center h-full">
        <h1 className=" uppercase ">Hello world</h1>

        <h2>Everything you were looking for is here</h2>

        <Button className="w-fit" variant="default">
          Join
        </Button>
      </div>
      <div className="max-w-[50%] lg:max-w-[90%] relative  ">
        <Earth />{" "}
        <div className="absolute top-[45%] left-0">
          <DeveloperPopup {...estherHoward} />
        </div>
        <div className="absolute bottom-1/4 left-1/3">
          <DeveloperPopup {...ronaldRichards} />
        </div>
        <div className="absolute-center">
          <DeveloperPopup {...wadeWarren} />
        </div>
        <div className="absolute top-[15%] left-1/4">
          <DeveloperPopup {...therriWebb} />
        </div>
        <div className="absolute right-[15%] top-[45%]">
          <DeveloperPopup {...albertFlores} />
        </div>
        <div className="absolute top-[23%] right-[20%]">
          <DeveloperPopup {...robertFox} />
        </div>
      </div>
    </header>
  );
}
