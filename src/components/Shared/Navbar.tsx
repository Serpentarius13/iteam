"use client";
import { buttonVariants } from "@/components/Shared/Buttons/Button";

import Logo from "@/components/Shared/Logo";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Loader from "./Load/Loader";

import { Session } from "next-auth/core/types";

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

const LogOnBtns = () => {
  return (
    <>
      <Link href="/profile">
        <div className="flex items-center gap-[0.5rem] text-[1.6rem] text-light-blue">
          Your profile
          <svg
            width="28"
            height="28"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20 38C29.941 38 38 29.941 38 20C38 10.059 29.941 2 20 2C10.059 2 2 10.059 2 20C2 29.941 10.059 38 20 38ZM20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40Z"
              fill="#75D9FF"
            />
            <path
              d="M8 31.63C8 30.597 8.772 29.724 9.8 29.61C17.515 28.756 22.52 28.833 30.218 29.629C30.6024 29.6694 30.9667 29.8208 31.2665 30.0648C31.5663 30.3089 31.7885 30.6349 31.906 31.0031C32.0235 31.3714 32.0312 31.7658 31.9282 32.1384C31.8252 32.5109 31.616 32.8454 31.326 33.101C22.241 41.02 17.049 40.911 8.64 33.109C8.23 32.729 8 32.188 8 31.63Z"
              fill="#75D9FF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M30.115 30.623C22.478 29.833 17.545 29.759 9.90901 30.604C9.65765 30.6333 9.42593 30.7543 9.25821 30.9438C9.09049 31.1333 8.99855 31.3779 9.00001 31.631C9.00001 31.917 9.11901 32.188 9.32001 32.376C13.488 36.242 16.646 37.989 19.733 38C22.831 38.011 26.159 36.278 30.669 32.348C30.8123 32.2205 30.9154 32.0541 30.9659 31.869C31.0164 31.684 31.012 31.4882 30.9533 31.3056C30.8946 31.123 30.7842 30.9614 30.6354 30.8404C30.4865 30.7194 30.3058 30.6432 30.115 30.623ZM9.69001 28.616C17.486 27.753 22.564 27.831 30.322 28.634C30.9003 28.6944 31.4485 28.922 31.8994 29.2891C32.3503 29.6562 32.6844 30.1468 32.8607 30.7009C33.0371 31.2549 33.0481 31.8484 32.8924 32.4086C32.7367 32.9688 32.421 33.4714 31.984 33.855C27.409 37.843 23.599 40.015 19.727 40C15.844 39.986 12.202 37.777 7.96101 33.842C7.65736 33.5592 7.4153 33.2168 7.24995 32.8362C7.0846 32.4556 6.99951 32.045 7.00001 31.63C6.99855 30.8844 7.27221 30.1645 7.76857 29.6082C8.26493 29.0519 8.94909 28.6992 9.69001 28.616Z"
              fill="#75D9FF"
            />
            <path
              d="M28 16C28 18.1217 27.1571 20.1566 25.6569 21.6569C24.1566 23.1571 22.1217 24 20 24C17.8783 24 15.8434 23.1571 14.3431 21.6569C12.8429 20.1566 12 18.1217 12 16C12 13.8783 12.8429 11.8434 14.3431 10.3431C15.8434 8.84285 17.8783 8 20 8C22.1217 8 24.1566 8.84285 25.6569 10.3431C27.1571 11.8434 28 13.8783 28 16Z"
              fill="#75D9FF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20 22C21.5913 22 23.1174 21.3679 24.2426 20.2426C25.3679 19.1174 26 17.5913 26 16C26 14.4087 25.3679 12.8826 24.2426 11.7574C23.1174 10.6321 21.5913 10 20 10C18.4087 10 16.8826 10.6321 15.7574 11.7574C14.6321 12.8826 14 14.4087 14 16C14 17.5913 14.6321 19.1174 15.7574 20.2426C16.8826 21.3679 18.4087 22 20 22ZM20 24C22.1217 24 24.1566 23.1571 25.6569 21.6569C27.1571 20.1566 28 18.1217 28 16C28 13.8783 27.1571 11.8434 25.6569 10.3431C24.1566 8.84285 22.1217 8 20 8C17.8783 8 15.8434 8.84285 14.3431 10.3431C12.8429 11.8434 12 13.8783 12 16C12 18.1217 12.8429 20.1566 14.3431 21.6569C15.8434 23.1571 17.8783 24 20 24Z"
              fill="#75D9FF"
            />
          </svg>
        </div>
      </Link>

      <button
        onClick={() =>
          signOut({ callbackUrl: "/login" }).then((r) => location.reload())
        }
      >
        <div className="flex items-center gap-[0.5rem] text-[1.6rem] text-light-blue">
          Sign out
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.16667 13.5625C8 13.3958 7.92 13.1944 7.92667 12.9583C7.93334 12.7222 8.02028 12.5208 8.1875 12.3542L9.70834 10.8333H3.33334C3.09723 10.8333 2.89917 10.7533 2.73917 10.5933C2.57917 10.4333 2.49945 10.2356 2.5 10C2.5 9.76389 2.58 9.56583 2.74 9.40583C2.9 9.24583 3.09778 9.16611 3.33334 9.16667H9.70834L8.16667 7.625C8 7.45833 7.91667 7.26028 7.91667 7.03084C7.91667 6.80139 8 6.60361 8.16667 6.4375C8.33334 6.27083 8.53139 6.1875 8.76084 6.1875C8.99028 6.1875 9.18806 6.27083 9.35417 6.4375L12.3333 9.41667C12.4167 9.5 12.4758 9.59028 12.5108 9.6875C12.5458 9.78472 12.5631 9.88889 12.5625 10C12.5625 10.1111 12.5453 10.2153 12.5108 10.3125C12.4764 10.4097 12.4172 10.5 12.3333 10.5833L9.33334 13.5833C9.18056 13.7361 8.98972 13.8125 8.76084 13.8125C8.53195 13.8125 8.33389 13.7292 8.16667 13.5625ZM4.16667 17.5C3.70834 17.5 3.31584 17.3367 2.98917 17.01C2.6625 16.6833 2.49945 16.2911 2.5 15.8333V13.3333C2.5 13.0972 2.58 12.8992 2.74 12.7392C2.9 12.5792 3.09778 12.4994 3.33334 12.5C3.56945 12.5 3.7675 12.58 3.9275 12.74C4.0875 12.9 4.16723 13.0978 4.16667 13.3333V15.8333H15.8333V4.16667H4.16667V6.66667C4.16667 6.90278 4.08667 7.10084 3.92667 7.26084C3.76667 7.42084 3.56889 7.50056 3.33334 7.5C3.09723 7.5 2.89917 7.42 2.73917 7.26C2.57917 7.1 2.49945 6.90222 2.5 6.66667V4.16667C2.5 3.70833 2.66334 3.31583 2.99 2.98917C3.31667 2.6625 3.70889 2.49945 4.16667 2.5H15.8333C16.2917 2.5 16.6842 2.66333 17.0108 2.99C17.3375 3.31667 17.5006 3.70889 17.5 4.16667V15.8333C17.5 16.2917 17.3367 16.6842 17.01 17.0108C16.6833 17.3375 16.2911 17.5006 15.8333 17.5H4.16667Z"
              fill="#75D9FF"
            />
          </svg>
        </div>
      </button>
    </>
  );
};

const ButtonDecider = ({ session }: { session: Session | null }) => {
  return <>{session?.user ? <LogOnBtns /> : <NavbarBtns />}</>;
};

const MobileNavbar = ({ session }: { session: Session | null }) => {
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
        className="links fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-[3rem] bg-darkest-blue !text-[1.6rem] text-white"
      >
        <NavbarLinks />

        <li className="flex flex-col items-center gap-[2rem]">
          <ButtonDecider session={session} />
        </li>
      </ul>
    </div>
  );
};

export default function Navbar({ session }: { session: Session | null }) {
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
      className={` fixed top-0 z-[100] w-screen py-[2.5rem] transition-all ${
        isShowingBg && "bg-[#041e2e4d] backdrop-blur-biggy "
      }`}
    >
      <div className="center flex items-center  justify-between">
        <Logo />
        <ul className="flex items-center gap-[5.4rem] text-[1.2rem] text-white lg:hidden">
          <NavbarLinks />
        </ul>

        <div className="flex items-center gap-[1.9rem] lg:hidden">
          <ButtonDecider session={session} />
        </div>

        <div className=" hidden lg:block">
          <MobileNavbar session={session} />
        </div>
      </div>
    </nav>
  );
}
