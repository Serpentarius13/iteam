import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma-db";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/lib/auth";
import { Fields } from "@prisma/client";

export async function POST(request: Request | any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const body = await request.json();

    const { fields, profession }: { fields: Fields[]; profession: string } =
      body;

    if (!fields || fields?.length === 0)
      return new Response("No fields were provided", { status: 400 });

    if (!profession || profession?.length === 0)
      return new Response("No profession was provided", { status: 400 });

    await prisma.fieldRelation.createMany({
      data: fields.map((field) => ({
        userId: session.user.id,
        fieldId: field.id,
      })),
    });

  

    delete session.user.fields;

    await prisma?.user.update({
      where: { id: session?.user.id },
      data: { ...(session!.user as any), profession },
    });

    return new Response("ok", { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}


