import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions, User } from "next-auth";
import { db } from "./db";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchRedis } from "./fetchRedis";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import client from "./prisma-db";
import { PrismaClient } from "@prisma/client";

function getCredentials(prefix: string) {
  const clientId = process.env[`${prefix.toUpperCase()}_CLIENT_ID`];

  if (!clientId || clientId.length === 0)
    throw new Error(`No ${prefix} client id`);

  const clientSecret = process.env[`${prefix.toUpperCase()}_SECRET`];

  if (!clientSecret || clientSecret.length === 0)
    throw new Error(`No ${prefix} client secret`);

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(client),

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: getCredentials("github").clientId,
      clientSecret: getCredentials("github").clientSecret,
    }),
    GoogleProvider({
      clientId: getCredentials("google").clientId,
      clientSecret: getCredentials("google").clientSecret,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = req.body as {
          email: string;
          password: string;
        };

        const user = await prisma?.user.findUnique({ where: { email } });

        if (!user) throw new Error("No user found");

        if (user.password !== password) throw new Error("Wrong password");

        return user as User;
      },
    }),
  ],

  callbacks: {
    //@ts-ignore
    async jwt({ token, user }) {
      const dbUser = await client.user.findUnique({
        where: { id: token.sub || token.id },
      });

      if (!dbUser) {
        if (user) {
          token.id = user!.id;
        }
        return token;
      }

      const fields = await prisma?.field.findMany({
        where: { userId: dbUser.id },
        include: { field: true },
      });

      const checkFields = await prisma?.field.count();
      console.log(checkFields);

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        profession: dbUser.profession,
        fields,
      };

      // const dbUserResult = (await fetchRedis("get", `user:${token.id}`)) as
      //   | string
      //   | null;

      // if (!dbUserResult) {
      //   if (user) {
      //     token.id = user!.id;
      //   }

      //   return token;
      // }

      // const dbUser = JSON.parse(dbUserResult) as User;

      // return {
      //   id: 123,
      //   name: 123,
      //   email: 123,
      //   picture: 123,
      //   profession: 123,
      // };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.profession = token.profession;
        session.user.fields = token.fields;
      }

      return Promise.resolve(session);
    },
    redirect({ url, baseUrl }) {
      console.log(url, baseUrl);
      return "/test";
    },
  },
};
