import { Redis } from "@upstash/redis";

const url = process.env.NEXT_PUBLIC_REDIS_URL as string;
const token = process.env.NEXT_PUBLIC_REDIS_TOKEN as string;

export const db = new Redis({
  url,
  token,
});

