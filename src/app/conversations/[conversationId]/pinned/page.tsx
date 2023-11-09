import getConversationMessages from "@/app/actions/getConversationMessages";
import getPinned from "@/app/actions/getPinned";
import NoOpenChat from "@/components/NoOpenChat";
import MessageBody from "@/components/conversations/[conversationId]/MessageBody";
import PinnedHeader from "@/components/conversations/[conversationId]/pinned/PinnedHeader";

interface IParams {
  conversationId: string;
}

const Pinned = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationMessages(params.conversationId);
  const messages = await getPinned(params.conversationId);

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
          <PinnedHeader conversation={conversation} />
          <MessageBody initialMessages={messages} />
        </div>
      </div>
    </>
  );
};

export default Pinned;
