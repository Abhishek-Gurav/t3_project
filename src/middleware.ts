import { authMiddleware } from "@clerk/nextjs";

// console.log("Middleware");
export default authMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};