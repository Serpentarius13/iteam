"use client";

import Avatar from "@/components/Shared/Form/Avatar";
import { ReactNode, useEffect, useMemo, useState } from "react";

import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/Shared/Load/LoadingScreen";
import Button, { buttonVariants } from "@/components/Shared/Buttons/Button";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextInput from "@/components/Shared/Form/TextInput";
import { toaster } from "@/features/services/toaster";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import professions from "@/features/constants/professions";
import Select from "@/components/Shared/Form/Select";

const schema = z.object({
  name: z
    .string()
    .min(2, "Name cant be less than 2 symbols")
    .max(100, "Name cant be more than 100 symbols"),
  email: z.string().email("Enter a correct email"),
});

type TFormValues = z.infer<typeof schema>;

export default function RootLayout({ children }: { children: ReactNode }) {
  const { data, status } = useSession();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");

  function handleSelectOption(option: string) {
    setProfession(option);
  }

  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: TFormValues) => {
      await axios.patch("/api/user/", { ...data, profession });
    },
    onSuccess() {
      setIsEditing(false);
      location.reload();

      toaster.success("Your data was successfully updated");
    },
    onError() {
      toaster.error("There was an error updating your profile");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name, email },
  });

  useEffect(() => {
    if (data && data?.user && !name && !email) {
      setName(data.user.name as string);
      setEmail(data.user.email as string);
      setProfession(data.user.profession ?? "");

      reset({
        email: data.user.email as string,
        name: data.user.name as string,
      });
    }
  }, [data, reset]);

  const onSubmit = async (data: TFormValues) => {
    mutate(data);
  };

  const verified = false;
  return (
    <main className="w-screen h-screen flex items-center justify-between center lg:flex-col pt-[20rem] ">
      <div className="w-[25rem] h-full flex flex-col gap-[2rem]">
        <Avatar />
        {isEditing ? (
          <>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[2rem] pt-[1rem] relative "
            >
              <TextInput
                register={register("email")}
                error={errors.email?.message}
                placeholder="Your email"
              />

              <TextInput
                register={register("name")}
                error={errors.name?.message}
                placeholder="Your name"
              />

              <Select
                currentOption={profession}
                arrayOfOptions={professions}
                handleChange={handleSelectOption}
                placeholder="Profession"
              />

              <Button variant="default"> Save changes </Button>

              <LoadingScreen isLoading={isLoading} />
            </form>
          </>
        ) : (
          <div className="flex flex-col gap-[2rem] pt-[1rem] text-white text-[1.7rem]">
            <span>{data?.user.name}</span>
            <div className="flex items-center gap-[1rem]">
              <span>{data?.user.email}</span>
              {verified && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_161_109)">
                    <path
                      d="M10.0003 18.3333C11.0949 18.3347 12.1789 18.1198 13.1902 17.701C14.2014 17.2821 15.1199 16.6675 15.8928 15.8925C16.6678 15.1195 17.2824 14.2011 17.7013 13.1898C18.1202 12.1786 18.3351 11.0946 18.3337 10C18.3351 8.90544 18.1201 7.82141 17.7013 6.81018C17.2824 5.79894 16.6678 4.88046 15.8928 4.1075C15.1199 3.33251 14.2014 2.71791 13.1902 2.29903C12.1789 1.88015 11.0949 1.66525 10.0003 1.66666C8.90578 1.66527 7.82174 1.88019 6.81051 2.29906C5.79928 2.71794 4.88079 3.33253 4.10783 4.1075C3.33286 4.88046 2.71828 5.79894 2.2994 6.81018C1.88052 7.82141 1.6656 8.90544 1.667 10C1.66558 11.0946 1.88049 12.1786 2.29937 13.1898C2.71825 14.2011 3.33284 15.1195 4.10783 15.8925C4.88079 16.6675 5.79928 17.2821 6.81051 17.7009C7.82174 18.1198 8.90578 18.3347 10.0003 18.3333Z"
                      stroke="#75D9FF"
                      stroke-width="1.66667"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0007 15.4167C10.2769 15.4167 10.5419 15.3069 10.7372 15.1116C10.9326 14.9162 11.0423 14.6513 11.0423 14.375C11.0423 14.0987 10.9326 13.8338 10.7372 13.6384C10.5419 13.4431 10.2769 13.3333 10.0007 13.3333C9.72438 13.3333 9.45943 13.4431 9.26408 13.6384C9.06873 13.8338 8.95898 14.0987 8.95898 14.375C8.95898 14.6513 9.06873 14.9162 9.26408 15.1116C9.45943 15.3069 9.72438 15.4167 10.0007 15.4167Z"
                      fill="#75D9FF"
                    />
                    <path
                      d="M10 5V11.6667"
                      stroke="#75D9FF"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_161_109">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}{" "}
            </div>
            <span>Georgia</span>
            <span>
              {data?.user.profession ? (
                `${data.user.profession}`
              ) : (
                <Link
                  className={buttonVariants({ variant: "default" })}
                  href="/finish"
                >
                  {" "}
                  Finish registration
                </Link>
              )}
            </span>
            <button
              className="flex items-center gap-[1rem]"
              onClick={() => setIsEditing((s) => !s)}
            >
              <span>Edit profile</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0833 7.43749L12.5417 3.93749L13.7083 2.77082C14.0278 2.45138 14.4203 2.29166 14.8858 2.29166C15.3514 2.29166 15.7436 2.45138 16.0625 2.77082L17.2292 3.93749C17.5486 4.25693 17.7153 4.64249 17.7292 5.09416C17.7431 5.54582 17.5903 5.9311 17.2708 6.24999L16.0833 7.43749ZM14.875 8.66666L6.04167 17.5H2.5V13.9583L11.3333 5.12499L14.875 8.66666Z"
                  fill="#75D9FF"
                />
              </svg>
            </button>{" "}
          </div>
        )}
      </div>

      <LoadingScreen isLoading={status === "loading"} />
    </main>
  );
}
