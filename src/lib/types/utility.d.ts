import { Fields } from "@prisma/client";

export type TTag = Pick<Fields, "fieldName" | "id">;

export interface FriendRequest {
  id: string;
  name: string;
  image: string;
  friendId: string;
  isHandled: boolean;
}

export interface Message {
  id: string;
  userId: string;
  createdAt: Date;
  text: string;
  name: string;
  avatar: string;
  roomId: string;
}

export interface ChatRoom {
  messages: Message[];
  exists: boolean;

}
