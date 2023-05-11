import SocialButtons from "@/components/Forms/SocialButtons";
import Button from "@/components/Shared/Buttons/Button";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

import Link from "next/link";
import dynamic from "next/dynamic";

const RegistrationForm = dynamic(
  () => import("@/components/Forms/RegistrationForm")
);

export default async function Register() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center gap-[2rem] overflow-x-hidden">
      <h2 className="form-title">Sign up</h2>
      <RegistrationForm />
      <p className="w-[4.7rem] relative text-center bg-darkest-blue text-[2rem] text-light-gray after:content-[''] after:w-[18rem] after:absolute after:border-b-2 after:border-b-[#979797] after:top-1/2 after:-translate-y-1/2 after:-z-[1] after:left-1/2 after:-translate-x-1/2 ">
        or
      </p>

      <div className="pt-[0.7rem flex items-center gap-[2.2rem]">
        <SocialButtons />
      </div>

      <span className="text-[1.3rem] text-light-gray -tracking-[0.32px]">
        Already have an account?
        <Link className="text-white underline" href="/login">
          {" "}
          Sign in{" "}
        </Link>
      </span>
    </main>
  );
}
