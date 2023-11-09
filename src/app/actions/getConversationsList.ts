import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationsList = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc", // ordering message based on activity, not newest message. this includes the currentUser that may have replied to a conversation which will be put at the top.
      },
      where: {
        userIds: {
          has: currentUser.id, // to specify that we are only looking for conversations the currentUser is involved in
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true, // this will show the sender and seen data attached to the messages
            seen: true,
          },
        },
      },
    });
    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversationsList;
