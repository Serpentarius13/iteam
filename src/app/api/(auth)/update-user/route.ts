import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma-db";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/lib/auth";
import { Fields } from "@prisma/client";
import { redirect } from "next/navigation";

export async function POST(request: Request | any) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  const body = await request.json();

  const { fields, profession }: { fields: Fields[]; profession: string } = body;

  if (!fields || fields?.length === 0)
    return new Response("No fields were provided", { status: 400 });

  if (!profession || profession?.length === 0)
    return new Response("No profession was provided", { status: 400 });

  try {
    delete session.user.fields;
    await prisma.$transaction([
      prisma.fieldRelation.createMany({
        data: fields.map((field) => ({
          userId: session.user.id,
          fieldId: field.id,
        })),
      }),
      prisma?.user.update({
        where: { id: session?.user.id },
        data: { ...(session!.user as any), profession, verified: true },
      }),
    ]);

    
    return new Response("Ok");
  } catch (error) {
    return new Response("Error with the database", { status: 500 });
  }

}
