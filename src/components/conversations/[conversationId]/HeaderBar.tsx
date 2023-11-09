"use client";

import UserProfile from "@/components/UserProfile";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillPinAngleFill } from "react-icons/bs";

interface HeaderBarProps {
  conversation: Conversation & {
    users: User[];
  };
}

const HeaderBar: React.FC<HeaderBarProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}/pinned`);
  }, [conversation.id, router]);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);
  return (
    <>
      <div className="bg-orange-100 w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-neutral-500 hover:text-amber-600 transition cursor-pointer"
          >
            <AiOutlineArrowLeft size={30} />
          </Link>
          {/* <div>{conversation}</div> */}
          <UserProfile user={otherUser} />
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <div className=" flex items-center" onClick={onClick}>
          <BsFillPinAngleFill
            size={32}
            onClick={() => {}}
            className="text-neutral-500 hover:text-neutral-600"
          />
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
