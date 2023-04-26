"use client";
import { buttonVariants } from "@/components/Shared/Buttons/Button";
import Icons from "@/components/Shared/Icons";
import Logo from "@/components/Shared/Logo";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";

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
  const burgerInput = useRef<HTMLInputElement | null>(null);

  function handleCloseBurger() {
    if (!burgerInput?.current) return;
    burgerInput.current.checked = false;
    document.body.style.overflow = "auto";
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";
  }
  return (
    <div className="mobile-nav">
      <label className="z-50">
        <input
          type="checkbox"
          className="hidden"
          ref={burgerInput}
          onChange={handleChange}
        />
        <span />
        <span />
        <span />
      </label>
      <ul
        onClick={handleCloseBurger}
        className="links w-screen h-screen fixed top-0 left-0 bg-darkest-blue text-white flex flex-col items-center justify-center gap-[3rem] !text-[1.6rem]"
      >
        <NavbarLinks />

        <li className="flex gap-[2rem]">
          <NavbarBtns />
        </li>
      </ul>
    </div>
  );
};

export default function Navbar() {
  const [isShowingBg, setShowingBg] = useState<boolean>(false);
  useEffect(() => {
    document.body.addEventListener("wheel", (e) => {
      const { scrollY } = window;
      if (scrollY > 200) {
        setShowingBg(true);
      } else setShowingBg(false);
    });
  }, []);

  return (
    <nav
      className={` py-[2.5rem] fixed top-0 z-[100] w-screen transition-all ${
        isShowingBg && "bg-[#041e2e4d] backdrop-blur-biggy "
      }`}
    >
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
