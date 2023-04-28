import prisma from "@/lib/prisma-db";
import { redirect } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
    });

    return new Response("Ok", { status: 200 });
  } catch (error) {
    redirect("/404");
  }
}
