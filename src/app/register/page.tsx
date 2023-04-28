import RegistrationForm from "@/components/Forms/RegistrationForm";
import { getServerSession } from "next-auth";

export default async function Register() {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <RegistrationForm />
    </main>
  );
}
