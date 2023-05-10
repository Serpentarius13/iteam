import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma-db";
import { FriendRequest, TTag } from "@/lib/types/utility";
import { NextResponse } from "next/server";
import { User } from "@prisma/client";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });
    const { fields, profession }: { fields: TTag[]; profession: string } =
      await request.json();

    let users: User[] = [];

    if (fields.length) {
      const fieldIds = fields.map((el) => el.id);
      const relatedFields = await prisma.fieldRelation.findMany({
        where: { fieldId: { in: fieldIds } },
        select: { userId: true },
      });
      const uniqueUserIds = new Set(
        relatedFields
          .map((el) => el.userId)
          .filter((el) => el != session.user.id)
      );

      users = await prisma.user.findMany({
        where: { profession, id: { in: [...uniqueUserIds] } },
      });
    } else {
      users = await prisma.user.findMany({ where: { profession } });
    }

    users = users.filter((el) => el.id !== session.user.id);
    users = await Promise.all(
      users.map(async (user) => {
        const requests = await prisma?.friendRequest.findMany({
          where: { owner: user.id },
        });
        if (requests.find((request) => request.friendId == session.user.id)) {
          return { ...user, sentRequest: true };
        } else return { ...user, sentRequest: false };
      })
    );

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return new Response("Error getting users", { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });
    const body = await request.json();

    if (Object.keys(body).length === 0)
      return new Response("Not enough data", { status: 422 });

    const { email } = body;

    const isNewEmail = email !== session.user.email && Boolean(email);

    if (isNewEmail) {
      const isAnotherEmailExist = await prisma.user.findUnique({
        where: { email },
      });
      if (isAnotherEmailExist)
        return new Response("Email is already taken", { status: 409 });
    }

    if (isNewEmail) {
      await prisma.user
        .update({
          where: { id: session.user.id },
          data: { ...body, verified: false },
        })
        .then((res) => {
          fetch("/api/send-email");
        });
    } else
      await prisma.user.update({
        where: { id: session.user.id },
        data: { ...body },
      });

    return new Response("ok");
  } catch (error: any) {
    console.log(error);
    return new Response("There was an error updating your profile", {
      status: 400,
    });
  }
}
