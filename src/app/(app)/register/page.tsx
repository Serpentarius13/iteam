import RegistrationForm from "@/components/Forms/RegistrationForm";
import Button from "@/components/Shared/Buttons/Button";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

export default async function Register() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center gap-[2rem] overflow-x-hidden">
      <h2 className="form-title">Sign up</h2>
      <RegistrationForm />
    </main>
  );
}
