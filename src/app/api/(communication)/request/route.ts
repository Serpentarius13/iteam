import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { FriendRequest } from "@/lib/types/utility";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma-db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    const requests = await prisma?.friendRequest.findMany({
      where: { owner: session.user.id },
    });

    console.log(requests)

    return NextResponse.json(requests);
  } catch (error) {
    console.log(error);
    return new Response("Error getting friend requests", { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const { accept, userId }: { accept: boolean; userId: string } =
      await request.json();
    const session = await getServerSession(authOptions);

    if (!session) return new Response("Unauthorized", { status: 401 });
    if (!userId?.length)
      return new Response("No couser was provided", { status: 422 });

    await prisma?.friendRequest.deleteMany({ where: { friendId: userId } });

    if (accept) { 
      await prisma.$transaction([
        prisma?.friends.create({
          data: { friendId: session.user.id, userId },
        }),
        prisma?.friends.create({
          data: { friendId: userId, userId: session.user.id },
        }),
      ]);
    }

    return new Response("ok");
  } catch (error) {
    console.log(error);
    return new Response("Error handling friend request", { status: 400 });
  }
}
