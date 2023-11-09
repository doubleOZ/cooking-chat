import ConversationList from "@/components/conversations/ConversationList";
import Sidebar from "@/components/sidebar/Sidebar";
import getConversationsList from "../actions/getConversationsList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversationsList();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
