import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma-db";

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
