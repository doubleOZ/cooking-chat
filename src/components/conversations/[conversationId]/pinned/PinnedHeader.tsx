"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface PinnedHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const PinnedHeader: React.FC<PinnedHeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}/pinned`);
  }, [conversation.id, router]);

  const goBack = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);
  return (
    <>
      <div className=" w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between shadow-sm bg-orange-100">
        {/* <div className="flex gap-3 items-center"> */}
        <div
          className="items-center  block  text-neutral-500 hover:text-amber-600 transition cursor-pointer"
          onClick={goBack}
        >
          <AiOutlineArrowLeft
            size={30}
            className="text-neutral-500 hover:text-neutral-600 block"
          />
        </div>
      </div>
    </>
  );
};

export default PinnedHeader;
