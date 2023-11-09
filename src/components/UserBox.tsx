"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import UserProfile from "./UserProfile";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        // api call to start chat with another user
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);
  return (
    <div
      onClick={onClick}
      className="w-full relative flex items-center space-x-3 bg-orange-50 p-3 hover:bg-orange-100 transition cursor-pointer"
    >
      <UserProfile user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none ">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
