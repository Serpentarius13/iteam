import { getAllUserFields } from "@/features/services/fields";
import { Field } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = "123";

    const field: Field | any = {
      fieldId: 1,
      userId: "123",
    };

    const allFields = await prisma?.fields.findMany();

    const users = await prisma?.user.findMany();
    if (!users) return new Response("Not found", { status: 400 });

    console.log(users);

    await Promise.all(
      allFields!.map(async (field) => {
        const newField: Field | any = {
          fieldId: field.id,
          userId: users[0].id,
        };

        await prisma?.field.create({ data: newField });
      })
    );

    const fields = await getAllUserFields(users[0].id);

    return NextResponse.json(fields);
  } catch (error) {
    console.log(error);
  }
}
