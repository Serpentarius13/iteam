import { Message } from "@/lib/types/utility";
import { generateUUID } from "three/src/math/MathUtils";


export function createMessage(
  name: string | undefined | null,
  image: string | undefined | null,
  text: string,
  userId: string,
  roomId: string
): Message {
  return {
    name: name ?? "",
    avatar: image ?? "",
    text,
    userId,
    createdAt: new Date(),
    roomId,
    id: generateUUID(),
  };
}
