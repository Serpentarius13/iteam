import { Fields } from "@prisma/client";

export type TTag = Pick<Fields, "fieldName" | "id">;

export interface FriendRequest {
    id: string;
    name: string;
    image: string
    friendId: string;
    isHandled: boolean
}
