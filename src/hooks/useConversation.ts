import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  // useParams extracts the url so that it can be used later. in this case, we are extracting the conversationId from the url to be used to identify and load in messages for the correct conversation
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      //search for conversationId in params
      return "";
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [conversationId]); // the double !! turns a string value into a boolean. if there is a conversationId retrieve, means there should be a conversation opened.
  // which sets the boolean to true. if there is no conversationId, the boolean will return false
  return useMemo(() => ({ isOpen, conversationId }), [isOpen, conversationId]);
};

export default useConversation;
