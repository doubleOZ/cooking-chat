import prisma from "@/libs/prismadb";

import currentSession from "./currentSession";

const getCurrentUser = async () => {
  try {
    const session = await currentSession(); // we import this so that we don't have to repeated import authOptions

    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
