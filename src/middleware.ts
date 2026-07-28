import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { locale, pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (locale === "default") {
    const localizedPath = pathname === "/" ? "/en" : `/en${pathname}`;

    return NextResponse.redirect(
      new URL(`${localizedPath}${search}`, request.url),
      308
    );
  }

  return NextResponse.next();
}
