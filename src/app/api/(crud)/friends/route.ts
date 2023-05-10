import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma-db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    const friends = await prisma?.friends.findMany({
      where: { userId: session.user.id },

      select: {
        friend: {
          select: {
            name: true,
            email: true,
            id: true,
            image: true,
            profession: true,
          },
        },
      },
    });

    const friendsWithChats = await Promise.all(
      friends.map(async (friend) => {
        const { id } = friend.friend;
        const chat = await prisma?.chats.findFirst({
          where: {
            OR: [
              { userOne: session.user.id, userTwo: id },
              { userOne: id, userTwo: session.user.id },
            ],
          },
        });

        return { friend: { ...friend.friend, chat: chat?.id } };
      })
    );



    // });
    return NextResponse.json(friendsWithChats);
  } catch (error) {
    console.log(error);
    return new Response("Error getting friends", { status: 400 });
  }
}
