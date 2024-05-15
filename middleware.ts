import { authMiddleware } from "@clerk/nextjs/server";
 
export default authMiddleware({
  publicRoutes: [
    '/',
    '/api/webhook/clerk',
    '/api/webhook/stripe'
  ],
  ignoredRoutes: [
    '/api/webhook/clerk',
    '/api/webhook/stripe'
  ]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 