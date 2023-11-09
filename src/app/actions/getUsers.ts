import prisma from "@/libs/prismadb";
import currentSession from "./currentSession";

const getUsers = async () => {
  const session = await currentSession();

  if (!session?.user?.email) {
    // verify that there is a user session
    return [];
  }
  try {
    const users = await prisma.user.findMany({
      //list all users on the platform by querying the database
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          // and take current user out of the list as we don't want to be able to message ourselves
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
