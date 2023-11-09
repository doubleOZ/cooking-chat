import getConversationMessages from "@/app/actions/getConversationMessages";
import getMessages from "@/app/actions/getMessages";
import NoOpenChat from "@/components/NoOpenChat";
import ChatBox from "@/components/conversations/[conversationId]/ChatBox";
import HeaderBar from "@/components/conversations/[conversationId]/HeaderBar";
import MessageBody from "@/components/conversations/[conversationId]/MessageBody";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationMessages(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <NoOpenChat title="Open a chat or start a new conversation" />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <HeaderBar conversation={conversation} />
          <MessageBody initialMessages={messages} />
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default ConversationId;
