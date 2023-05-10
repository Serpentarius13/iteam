"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/Shared/Form/TextInput";
import Button from "@/components/Shared/Buttons/Button";

import { ArrowRight } from "lucide-react";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@prisma/client";

import toast from "react-hot-toast";
import LoadingScreen from "@/components/Shared/Load/LoadingScreen";
import { signIn } from "next-auth/react";
import { toaster } from "@/features/services/toaster";
import { useRouter } from "next/navigation";
import sleep from "@/features/services/sleep";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/dist/client/components/navigation";

const schema = z.object({
  email: z
    .string()
    .email("Enter correct email")
    .min(4, "Email cant be less than 4 symbols")
    .max(100, "Email cant be more than 100 symbols"),
  password: z
    .string()
    .min(8, "Password cant be less than 8 symbols")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    ),
});

type TFormValues = z.infer<typeof schema>;
export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>({ resolver: zodResolver(schema) });

  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: TFormValues) => {
    setLoading(true);
    const { email, password } = data;
    signIn("credentials", { email, password, redirect: false }).then(
      ({ ok, error }: any) => {
        if (error) toaster.error(error);
        else toaster.success("Successfully logged in!");
        setLoading(false);
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[35rem] max-w-[90vw] flex flex-col gap-[2rem] relative"
    >
      <TextInput
        register={register("email")}
        error={errors.email?.message}
        placeholder="Your email"
      />
      <TextInput
        register={register("password")}
        error={errors.password?.message}
        placeholder="Your password"
        type="password"
      />

      <Button variant="default">
        <div className=" text-white flex items-center gap-[0.5rem] justify-center text-[1.8rem] ">
          Login <ArrowRight />{" "}
        </div>
      </Button>

      <LoadingScreen isLoading={isLoading} />
    </form>
  );
}
