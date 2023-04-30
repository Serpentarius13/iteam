import { createMessage } from "@/features/services/createMessageDto";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Message } from "@/lib/types/utility";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";

import { getServerSession } from "next-auth/next";

import prisma from "@/lib/prisma-db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    // Достаю текст, и айди комнаты
    const body: {
      text: string;

      roomId: string;
    } = await request.json();

    const { text, roomId } = body;

    let toSend: Message;

    // Создаю сообщение
    toSend = createMessage(
      session.user.name,
      session.user.image,
      text,
      session.user.id,
      roomId
    );

    // Отправляю сообщение в чат
    const res = await db.lpush(`chat:${roomId}`, toSend);

    return NextResponse.json(toSend)
  } catch (error) {
    console.log(error);
    return new Response("Error sending a message", { status: 400 });
  }
}

// Создание чата
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    // Достаю айди друга
    const { friendId }: { friendId: string } = await request.json();

    if (!friendId)
      return new Response("No friend id was provided", { status: 422 });

    // Создаю чат с другом
    const chat = await prisma.chats.create({
      data: { userOne: session.user.id, userTwo: friendId },
    });

    // Возвращаю созданный чат для редиректа
    //TODO Сделать редирект?
    return NextResponse.json(chat);
  } catch (error) {
    return new Response("Error creating chat", { status: 400 });
  }
}
