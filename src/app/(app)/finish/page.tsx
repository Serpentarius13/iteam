"use client";

import FinishForm from "@/components/Forms/FinishForm";
import Button from "@/components/Shared/Buttons/Button";
import LoadingScreen from "@/components/Shared/Load/LoadingScreen";
import sleep from "@/features/services/sleep";
import { toaster } from "@/features/services/toaster";
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ErrorIcon } from "react-hot-toast";

export default function FinishRegistration() {
  const { data, status } = useSession({
    onUnauthenticated() {
      toaster.error("Unauthorized");
      sleep(1000).then((e) => router.push("/"));
    },
    required: true,
  });

  const router = useRouter();

  useEffect(() => {
    if (data?.user.profession) {
      router.push("/profile");
    }
  });

  return (
    <main className="w-screen h-screen overflow-x-hidden flex items-center justify-center ">
      {status == "loading" || data?.user.profession ? (
        <LoadingScreen isLoading={true} />
      ) : (
        <section className="flex flex-col items-center gap-[2rem]">
          <h2 className="form-title">Finish registration</h2>
          <FinishForm />
        </section>
      )}
    </main>
  );
}
