import { NextRequest, NextResponse } from "next/server";
import { isLanguage } from "@/lib/locales";

export function proxy(request: NextRequest) {
  const segment = request.nextUrl.pathname.split("/")[1];
  const locale = isLanguage(segment) ? segment : "nl";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-cannix-locale", locale);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"],
};
