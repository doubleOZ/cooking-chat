"use client";

import { User } from "@prisma/client";
import { useState } from "react";
import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0 ">
        <div className="">
          <div className="justify-between flex px-5 items-center">
            {/* <div onClick={() => setIsShown(true)}>
              <Menu />
            </div> */}
            <div className="text-2xl font-bold text-neutral-800 py-4">
              Other cooks
            </div>
          </div>
          {items.map((item) => (
            <UserBox key={item.id} data={item} />
          ))}
        </div>
      </aside>
    </>
  );
};

export default UserList;
