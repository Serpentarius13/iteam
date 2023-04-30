import { getServerSession, unstable_getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./lib/auth";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export async function middleware(request: Request | any) {
  const session = await getToken({ req: request });

  if (
    !session &&
    (request.url.includes("/profile") || request.url.includes("/board"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    (request.url.includes("/login") || request.url.includes("/register")) &&
    session
  ) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
}

export const config = {
  matcher: ["/login", "/register", "/profile/:path*", "/board"],
};
