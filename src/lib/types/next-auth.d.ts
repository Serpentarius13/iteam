import { User } from "next-auth";
import { TTag } from "./utility";

interface AuxilaryFields {
  profession: string;
  fields?: TTag[];
  verified: boolean
}
declare module "next-auth/jwt" {
  interface JWT extends AuxilaryFields {
    id: UserId;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }

  interface User extends AuxilaryFields {}
}

type TRole = 'member' | 'admin  '


