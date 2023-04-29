import prisma from "@/lib/prisma-db";
import { redirect } from "next/navigation";


export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  await prisma.user
    .update({
      where: { id: userId },
      data: { verified: true },
    })
    .then((_) => void redirect("/profile"));
}
