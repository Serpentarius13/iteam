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

    const requests: FriendRequest[] = await db.smembers(
      `requests:${params.userId}`
    );

    if (!!requests.find((request) => request.friendId == session.user.id)) {
      return new Response("", {
        status: 409,
        statusText: "Request was already sent",
      });
    }

    const couser = await prisma?.user.findUnique({
      where: { id: params.userId },
    });

    if (!couser) return new Response("No such user exists", { status: 409 });

    await db.sadd(`requests:${params.userId}`, {
      name: couser.name,
      image: couser.image,

      friendId: session.user.id,
    });

    return new Response("Ok");
  } catch (error) {
    console.log(error);
    return new Response("Error sending friend request", { status: 400 });
  }
}
