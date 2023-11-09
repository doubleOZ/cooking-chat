"use client";

import { FullMessageType } from "@/app/types";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import clsx from "clsx";
import { format } from "date-fns";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import { FaMapPin } from "react-icons/fa";

interface MessageContainerProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  data,
  isLast,
}) => {
  // mouse position context
  // const [globalMousePos, setGlobalMousePos] = useState({ x: 0, y: 0 });
  // const [localMousePos, setLocalMousePos] = useState({ x: 0, y: 0 });

  // const handleMouseMove = (event) => {
  //   const localX = event.clientX - event.target.offsetLeft;
  //   const localY = event.clientY - event.target.offsetTop;

  //   setLocalMousePos({ x: localX, y: localY });
  // };

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     setGlobalMousePos({
  //       x: event.clientX,
  //       y: event.clientY,
  //     });
  //   };
  //   window.addEventListener("mousedown", handleMouseMove);

  //   return () => {
  //     window.removeEventListener("mouseleave", handleMouseMove);
  //   };
  // }, []);

  const session = useSession();
  const isOwnMessage = session?.data?.user?.email === data?.sender?.email; // compare session email with message sent by email to see if it is the same user
  const seenList = (data.seen || []) // the empty array is once again just there to prevent .seen from throwing an error when we map or filter the seen data
    .filter((user) => user.email !== data?.sender?.email) // on filter, we are removing the sender from the list as they sent it and obviously saw the message
    .map((user) => user.name) // this will create an array of Users separated by ", "
    .join(", ");

  const pinnedMessage = data?.id;

  const handlePin = () => {
    // console.log("this is DATA id", data?.id);
    axios.post("/api/conversations/pinned", { ...data });
  };

  const container = clsx("flex gap-3 p-4", isOwnMessage && "justify-end");
  const userprofile = clsx(isOwnMessage && "order-2");
  const body = clsx("flex flex-col gap-2", isOwnMessage && "items-end");
  const bodyinside = clsx("flex flex-col gap-2", isOwnMessage && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden rounded-lg px-2 py-1",
    isOwnMessage ? "p-0 bg-orange-500 text-white" : " bg-slate-200 text-black"
  );

  return (
    <div className={container}>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="-bottom-11 absolute mt-2 w-56  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              // style={{
              //   top: `${localMousePos.y}px`,
              //   left: `${localMousePos.x}px`,
              // }}
            >
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handlePin}
                      className={`${
                        active ? "bg-amber-800 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <FaMapPin className="mr-2 h-5 w-5" aria-hidden="true" />
                      ) : (
                        <FaMapPin className="mr-2 h-5 w-5" aria-hidden="true" />
                      )}
                      Pin Recipe
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>

          <div className="">
            <div className={message}>
              <div className=" flex items-center gap-1">
                <div className="text-sm font-medium text-gray-600">
                  {isOwnMessage ? "" : data.sender.name}
                </div>
              </div>
              {data.image ? (
                <Image
                  alt="Image"
                  height="288"
                  width="288"
                  src={data.image}
                  className="w-auto h-auto"
                />
              ) : (
                <div className=" flex gap-3 items-end">
                  <div className="">{data.body}</div>
                  <div className="text-xs text-gray-600">
                    {format(new Date(data?.createAt), "p")}
                  </div>
                  {isLast && isOwnMessage && seenList.length > 0 && (
                    <div className="text-gray-600">
                      <Check />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Menu.Button>
      </Menu>
    </div>
  );
};

export default MessageContainer;
