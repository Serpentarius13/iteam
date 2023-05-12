import { NextResponse } from "next/server";

import { decode, getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";

export async function middleware(request: Request | any) {
  const session = await getToken({ req: request, raw: true });

  let decoded;

  if (session) {
    decoded = await decode({
      token: session,
      secret: process.env.JWT_SECRET as string,
    });
  }

  if (request.url.includes("/finish") && !!decoded?.profession) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (
    (request.url.includes("/login") || request.url.includes("/register")) &&
    session
  ) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (
    !session &&
    (request.url.includes("/profile") || request.url.includes("/board"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login", "/register", "/profile/:path*", "/board", "/finish"],
};
