"use client";

import clsx from "clsx";
import useConversation from "@/hooks/useConversation";
import NoOpenChat from "@/components/NoOpenChat";

const Home = () => {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <NoOpenChat title="Open a chat or start a new conversation" />
    </div>
  );
};

export default Home;
