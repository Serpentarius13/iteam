type Command = "zrange" | "sismember" | "get" | "smembers" | 'set';

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const upstashRedisRestUrl = process.env.NEXT_PUBLIC_REDIS_URL;
  const authToken = process.env.NEXT_PUBLIC_REDIS_TOKEN;
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`);
  }

  const data = await response.json();
  return data.result;
}
