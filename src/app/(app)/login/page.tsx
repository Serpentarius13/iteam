import RegistrationForm from "@/components/Forms/RegistrationForm";
import SignInForm from "@/components/Forms/SignInForm";


export default async function Login() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center gap-[2rem] overflow-x-hidden">
      <h2 className="form-title">Sign in</h2>
      <SignInForm />
    </main>
  );
}
