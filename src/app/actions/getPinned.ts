import prisma from "@/libs/prismadb";

const getPinned = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
        pinned: true,
      },
      include: {
        sender: true,
        seen: true,
        // pinned: true
      },
      orderBy: {
        createAt: "asc",
      },
    });

    return messages;
  } catch (error: any) {
    return [];
  }
};

export default getPinned;
