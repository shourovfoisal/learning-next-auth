/**
 * when there is no defined matcher in the middleware
 * the following line applies nextauth to the entire project
 */
export { default } from "next-auth/middleware"

/**
 * on the other hand, the following line applies nextauth
 * to only the matching routes
 */
export const config = { matcher: ["/dashboard"] }