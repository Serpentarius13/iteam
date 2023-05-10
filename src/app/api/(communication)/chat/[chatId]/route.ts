import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

import prisma from "@/lib/prisma-db";
import { ChatRoom, Message } from "@/lib/types/utility";

// Все сообщения из одного чата
export async function GET(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {


    const exists = await prisma?.chats.findUnique({
      where: { id: +params.chatId },
    });

    if (!exists) return NextResponse.json({ exists: false });


    const messages: Message[] = await db.lrange(`chat:${params.chatId}`, 0, -1);


    const chatRoom: ChatRoom = { messages, exists: true };
    return NextResponse.json(chatRoom);
  } catch (error) {
    console.log(error);
    return new Response("Error getting messages", { status: 400 });
  }
}
