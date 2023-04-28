"use client";
import { signIn, useSession } from "next-auth/react";

import Button from "@/components/Shared/Buttons/Button";
import { useEffect } from "react";
import { fetchRedis } from "@/lib/fetchRedis";
import { db } from "@/lib/db";
import prisma from "@/lib/prisma-db";

export default function Test() {
  async function loginWithGithub() {
    try {
      await signIn("github");
    } catch (error) {
      console.log(error);
    }
  }

  const { data, status } = useSession();

  useEffect(() => {
    if (data) fetch("/api/send-email");
  }, [data]);

  console.log(data);

  // async function getUser() {
  //   await fetch("/api/updateUser", {
  //     method: "POST",
  //     body: JSON.stringify({ fields: ["Vue"], profession: "frontend" }),
  //   });
  // }
  // useEffect(() => {
  //   console.log(data, status);

  //   if (data) {
  //     getUser();
  //   }
  // }, [data, status]);

  // fetch("/api/register", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     name: "abobus",
  //     password: "abobus",
  //     email: "abobusik@mail.ru",
  //     image: "image",
  //   }),
  // }).then(async (res) => {
  //   console.log(res);

  // });

 
  return (
    <Button variant="default" onClick={() => signIn('github')} className="mt-[10rem]">
      {" "}
      Войти с Github{" "}
    </Button>
  );
}
