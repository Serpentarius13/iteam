import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma-db";

import { authOptions } from "@/lib/auth";
import { Fields, User } from "@prisma/client";

export async function POST(request: Request | any) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  const body = await request.json();

  const {
    fields,
    profession,
    country,
  }: { fields: Fields[]; profession: string; country: string } = body;

  if (!fields || fields?.length === 0)
    return new Response("No fields were provided", { status: 400 });

  if (!profession || profession?.length === 0)
    return new Response("No profession was provided", { status: 400 });

  if (!country || country.length === 0)
    return new Response("No country was provided", { status: 400 });

  try {

    delete session.user.fields
    await prisma?.$transaction([
      prisma?.fieldRelation.createMany({
        data: fields.map((field) => ({
          userId: session.user.id,
          fieldId: field.id,
        })),
      }),
      prisma?.user.update({
        where: { id: session.user.id },
        data: { ...(session!.user as User), profession, country },
      }),
    ]);

    return new Response("Ok");
  } catch (error) {
    console.log(error);
    return new Response("Error with the database", { status: 500 });
  }
}
