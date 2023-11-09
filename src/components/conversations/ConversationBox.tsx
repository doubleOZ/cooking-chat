"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import useOtherUser from "@/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import UserProfile from "../UserProfile";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1]; // this gets the last message in the conversation
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false; // meaning if there is no lastMessage, there is no message to be seen
    }
    const seenArray = lastMessage.seen || []; // empty array set so that the code doesn't break later when we compare

    if (!userEmail) {
      return false; // if there is no user email, there is nothing to be compared for seenArray. this is possible if the session hasn't loaded in properly
    }
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return `Start conversation with ${data.name || otherUser.name}`;
  }, [lastMessage, data.name, otherUser.name]);
  return (
    <div
      onClick={onClick}
      className={clsx(
        "p-3 w-full relative flex items-center space-x-3 hover:bg-orange-100 transition cursor-pointer",
        selected ? "bg-orange-200" : "bg-orange-50"
      )}
    >
      {/* TODO dynamically show different profiles if its a group or another user */}
      <UserProfile user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-amber-800">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createAt && (
              <p className="text-xs text-gray-400 font-extralight">
                {format(new Date(lastMessage?.createAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              "truncate text-sm",
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
