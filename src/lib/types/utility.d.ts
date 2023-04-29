import { Fields } from "@prisma/client";

export type TTag = Pick<Fields, "fieldName" | "id">;
