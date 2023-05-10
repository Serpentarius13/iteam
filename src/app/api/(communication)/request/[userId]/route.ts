import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma-db";
import { FriendRequest } from "@/lib/types/utility";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return new Response("Unauthorized", { status: 401 });
    if (!params?.userId?.length)
      return new Response("No couser was provided", { status: 422 });

    const requests = await prisma.friendRequest.findMany({
      where: { owner: params.userId },
    });

    if (!!requests.find((request) => request.friendId == session.user.id)) {
      return new Response("", {
        status: 409,
        statusText: "Request was already sent",
      });
    }

    await prisma.friendRequest.create({
      data: {
        owner: params.userId,
        friendId: session.user.id,
        image: session.user.image as string,
        name: session.user.name as string,
      },
    });

    return new Response("Ok");
  } catch (error) {
    console.log(error);
    return new Response("Error sending friend request", { status: 400 });
  }
}
