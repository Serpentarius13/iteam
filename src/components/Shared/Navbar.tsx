import { buttonVariants } from "@/components/Shared/Button";
import Icons from "@/components/Shared/Icons";
import Logo from "@/components/Shared/Logo";
import Link from "next/link";

type TRouterLink = {
  href: string;
  text: string;
};

const routerLinks: TRouterLink[] = [
  { href: "/blog", text: "Blog" },
  { href: "/board", text: "Board" },
  { href: "/forum", text: "Forum" },
  { href: "/faq", text: "Faq" },
];

const NavbarLinks = () => {
  return (
    <>
      {routerLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>{link.text}</Link>
        </li>
      ))}
    </>
  );
};

const NavbarBtns = () => {
  return (
    <>
      <Link href="/login" className={buttonVariants({ variant: "outline" })}>
        Log in
      </Link>

      <Link href="/register" className={buttonVariants({ variant: "default" })}>
        {" "}
        Sign up{" "}
      </Link>
    </>
  );
};

const MobileNavbar = () => {
  return (
    <div className="mobile-nav">
      <label className="z-50">
        <input type="checkbox" className="hidden" />
        <span />
        <span />
        <span />
      </label>

      <ul className="links w-screen h-screen absolute top-0 left-0 bg-darkest-blue text-white flex flex-col items-center justify-center gap-[3rem] !text-[1.6rem]">
        <NavbarLinks />

        <li className="flex gap-[2rem]">
          <NavbarBtns />
        </li>
      </ul>
    </div>
  );
};

export default function Navbar() {
  return (
    <nav className="w-full py-[2.5rem] fixed top-0 z-[100]">
      <div className="center flex justify-between  items-center">
        <Logo />
        <ul className="flex items-center gap-[5.4rem] text-white text-[1.2rem] lg:hidden">
          <NavbarLinks />
        </ul>

        <div className="flex gap-[1.9rem] items-center lg:hidden">
          <NavbarBtns />
        </div>

        <div className=" hidden lg:block">
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}
