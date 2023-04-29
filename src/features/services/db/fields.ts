import prisma from "@/lib/prisma-db";
import { TTag } from "@/lib/types/utility";

export async function getAllUserFields(userId: string) {
  return await prisma?.fieldRelation.findMany({
    where: { userId },
    include: { field: true },
  });
}

export async function getAllFields() {
  try {
    return await prisma?.fields.findMany() as TTag[];
  } catch (error) {
    console.log(error)
  }
 
}
