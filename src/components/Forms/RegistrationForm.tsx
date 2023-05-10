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

const schema = z
  .object({
    name: z
      .string()
      .min(2, "Name cant be less than 2 symbols")
      .max(100, "Name cant be more than 100 symbols"),
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
    confirmPassword: z
      .string()
      .min(8, "Password cant be less than 8 symbols")
      .regex(
        /[!@#$%^&*]/,
        "Password must contain at least one special character"
      ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword != password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

type TFormValues = z.infer<typeof schema>;
export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<TFormValues>({ resolver: zodResolver(schema) });

  const { isLoading, mutate } = useMutation({
    mutationFn: (user: Partial<User>) => {
      return axios.post("/api/register", user);
    },
    onError: () => void toast.error("There was an error"),
    onSuccess: async () => {
      const { email, password } = getValues();
      await signIn("credentials", { email, password });
    },
  });

  const onSubmit = async (data: TFormValues) => {
    const { email, name, password } = data;
    mutate({ email, name, password, image: "/img/placeholder-avatar.jpg" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[35rem] max-w-[90vw] flex flex-col gap-[2rem] relative"
    >
      <TextInput
        register={register("name")}
        error={errors.name?.message}
        placeholder="Your name"
      />
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
      <TextInput
        register={register("confirmPassword")}
        error={errors.confirmPassword?.message}
        placeholder="Confirm password"
        type="password"
      />

      <Button variant="default">
        <div className=" text-white flex items-center gap-[0.5rem] justify-center text-[1.8rem] ">
          Next step <ArrowRight />{" "}
        </div>
      </Button>

      <LoadingScreen isLoading={isLoading} />
    </form>
  );
}
