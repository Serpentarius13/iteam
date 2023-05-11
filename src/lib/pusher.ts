import Pusher from "pusher-js";

import { default as PusherServer } from "pusher";

const key = process.env.NEXT_PUBLIC_PUSHER_KEY as string;

const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string;

const secret = process.env.PUSHER_SECRET as string;

const id = process.env.PUSHER_ID as string;

export const pusherClient = new Pusher(key, { cluster });

export const pusherServer = new PusherServer({
  appId: id,
  key,
  cluster,
  secret,
});
