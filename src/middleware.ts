import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*", //this protects all routes within dashboard if we have them
    "/conversations/:path*",
  ],
};
