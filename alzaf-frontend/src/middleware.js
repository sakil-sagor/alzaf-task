export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard/:page*"] };

// import { jwtDecode } from "jwt-decode";

// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// const AuthRoutes = ["/login", "/registration"];

// const roleBasedPrivateRoutes = {
//   admin: [/^\/dashboard\/?.*/],
// };

// export async function middleware(request) {
//   const { pathname } = request.nextUrl;

//   if (AuthRoutes.includes(pathname)) {
//     return NextResponse.next();
//   }

//   const accessToken = cookies().get("accessToken")?.value;

//   if (!accessToken) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   let decodedData = null;
//   try {
//     decodedData = jwtDecode(accessToken);
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   const role = decodedData?.role;
//   if (role && roleBasedPrivateRoutes[role]) {
//     const routes = roleBasedPrivateRoutes[role];
//     if (routes.some((route) => pathname.match(route))) {
//       return NextResponse.next();
//     }
//   }

//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: ["/login", "/registration", "/dashboard/:page*"],
// };
