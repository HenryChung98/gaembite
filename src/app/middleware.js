import { NextResponse } from "next/server";

export function middleware(request) {
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
  const { pathname } = request.nextUrl;

  if (
    maintenanceMode &&
    pathname !== "/maintenance" &&
    !pathname.startsWith("/_next")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
