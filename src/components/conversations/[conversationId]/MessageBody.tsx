"use client";

import { FullMessageType } from "@/app/types";
import useConversation from "@/hooks/useConversation";
import { useRef, useState, useEffect } from "react";
import MessageContainer from "./MessageContainer";
import axios from "axios";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";

interface MessageBodyProps {
  initialMessages: FullMessageType[];
}

const MessageBody: React.FC<MessageBodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          // we are checking if the current array of messages already has a message with the new message id to prevent duplicate messages.
          return current;
        }
        // update the array of messages with the newest message
        return [...current, message];
      });
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
    return () => {
      // when unmounting, we unsub and unbind to prevent server overflow
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, i) => (
          <MessageContainer
            isLast={i === messages.length - 1}
            key={message.id}
            data={message}
          />
        ))}
        <div ref={bottomRef} className="pt-24" />
      </div>
    </>
  );
};

export default MessageBody;
