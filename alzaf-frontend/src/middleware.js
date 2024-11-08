import { jwtDecode } from "jwt-decode";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/registration"];

const roleBasedPrivateRoutes = {
  admin: [/^\/dashboard\/?.*/],
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const authToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (authToken) {
    return NextResponse.next();
  }

  const accessToken = cookies().get("accessToken")?.value;
  if (accessToken) {
    let decodedData;
    try {
      decodedData = jwtDecode(accessToken);
    } catch (error) {
      console.error("Invalid token:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = decodedData?.role;
    if (role && roleBasedPrivateRoutes[role]) {
      const routes = roleBasedPrivateRoutes[role];
      if (routes.some((route) => pathname.match(route))) {
        return NextResponse.next();
      }
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/login", "/registration", "/dashboard/:page*"],
};
//
