import { LogOut, MessagesSquare, User2, Users, Users2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: MessagesSquare,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: Users,
        active: pathname === "/dashboard",
      },
      {
        label: "Logout",
        onClick: () => signOut(),
        href: "#",
        icon: LogOut,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
