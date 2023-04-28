import { User } from "@prisma/client";
import { signIn } from "next-auth/react";
import prisma from "@/lib/prisma-db";

interface IBody {
  name: string;
  email: string;
  password: string;
  image: string;
}

export async function POST(request: Request) {
  try {
    const nodemailer = require("nodemailer");
    const body = (await request.json()) as IBody;
    const { name, email, password, image } = body;

    if (!name || !email || !password || !image)
      return new Response("Not enough data", { status: 422 });

    const newUser: Partial<User> | any = {
      name,
      email,
      password,
      image,
    };

    await prisma?.user.create({ data: newUser });

    return new Response("ok", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(error?.message, { status: 400 });
  }
}
