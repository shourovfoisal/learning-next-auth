/**
 * when there is no defined matcher in the middleware
 * the following line applies nextauth to the entire project
 */
// export { default } from "next-auth/middleware"

/**
 * on the other hand, the following line applies nextauth
 * to only the matching routes
 */
// export const config = { matcher: ["/dashboard"] }

/**
 * New way of applying middleware
 */
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const urlBase = "http://localhost:3000"

export async function middleware(req: NextRequest) {
    const token = await getToken({req});

    console.log("Request url is");
    console.log(req.url);

    const path = req.nextUrl.pathname;
    console.log("Path is: ");
    console.log(path);
    console.log("----------------");

    if(token?.status === "OTP_REQUIRED" && path !== "/twofactor") {
        console.log("OTP is required!");
        return NextResponse.redirect(`${urlBase}/twofactor?user=${token?.name}`);
    }

    return NextResponse.next();
}

// export const config = {
//     matcher: [
//       '/((?!_next|api/auth).*)(.+)'
//     ],
//   }

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}