import ConversationList from "@/components/conversations/ConversationList";
import Sidebar from "@/components/sidebar/Sidebar";
import getConversationsList from "../actions/getConversationsList";
import getCurrentUser from "../actions/getCurrentUser";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversationsList();
  const currentUser = await getCurrentUser();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList
          initialItems={conversations}
          currentUser={currentUser!}
        />
        {children}
      </div>
    </Sidebar>
  );
}
