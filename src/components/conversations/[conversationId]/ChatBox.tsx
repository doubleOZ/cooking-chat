"use client";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { Paperclip, PaperclipIcon } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./MessageInput";
import Button from "@/components/ui/Button";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { CldUploadButton } from "next-cloudinary";

const ChatBox = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { message: "" } });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", { ...data, conversationId: conversationId });
  };

  const imageUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };
  return (
    <>
      <div className="p-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={imageUpload}
          uploadPreset="bdupwckc"
        >
          <PaperclipIcon className="text-neutral-500 hover:text-neutral-600" />
        </CldUploadButton>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 lg:gap-4 w-full"
        >
          <MessageInput
            id="message"
            register={register}
            errors={errors}
            required
            placeholder="Write a message..."
          />
          <button
            type="submit"
            className="rounded-full p-2 text-neutral-500 hover:text-amber-600 transition cursor-pointer"
          >
            <PiPaperPlaneRightFill size={23} />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBox;
