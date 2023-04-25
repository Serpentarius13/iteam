import Logo from "@/components/Shared/Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full pb-[6.5rem] flex flex-col items-center justify-center gap-[3.1rem]">
      <Logo />

      <div className="flex flex-col gap-[5.4rem] items-center text-[1.2rem] text-white">
        <Link href="/about"> About us </Link>

        <Link href="FAQ">FAQ</Link>
      </div>
    </footer>
  );
}
