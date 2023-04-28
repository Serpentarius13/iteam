import prisma from "@/lib/prisma-db";

export async function getAllUserFields(userId: string) {
  //   return await prisma?.field
  //     .findMany({ where: { userId } })
  //     .then(async (fields) => {
  //       return await Promise.all(
  //         fields.map(async (field) => {
  //           const { fieldId } = field;
  //           return await prisma?.fields.findUnique({ where: { id: fieldId } });
  //         })
  //       );
  //     });
  // }

  return await prisma?.fieldRelation.findMany({
    where: { userId },
    include: { field: true },
  });
}
