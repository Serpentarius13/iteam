import Image from "next/image";

type TEmailLink = {
  icon: string;
  iconAlt: string;

  url: string;
};

const emailLinks: TEmailLink[] = [
  {
    icon: "/icons/email/gmail.svg",
    iconAlt: "Google logo",
    url: "https://mail.google.com",
  },
  {
    icon: "/icons/email/yahoo.svg",
    iconAlt: "Yahoo logo",
    url: "https://mail.yahoo.com",
  },
  {
    icon: "/icons/email/mailru.svg",
    iconAlt: "Mail.ru logo",
    url: "https://mail.ru",
  },
];

export default function EmailLinks() {
  return (
    <ul className="flex flex-wrap gap-[1.4rem] items-center">
      {emailLinks.map((link) => (
        <li key={link.iconAlt}>
          <a href={link.url} target="_blank">
            <Image
              width={64}
              height={64}
              src={link.icon}
              alt={link.iconAlt}
              aria-label={link.iconAlt}
              title={link.iconAlt}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
