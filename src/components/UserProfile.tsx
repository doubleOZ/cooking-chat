"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface UserProfileProps {
  user?: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          className="w-auto h-auto"
          alt="UserProfile"
          src={user?.image || "/images/placeholder.jpg"}
          fill
        />
      </div>
      <span className="absolute block rounded-full bg-orange-500 ring-2 ring-white bottom-0 right-0 h-2 w-2 md:h-3 md:w-3"></span>
      {/* hard coded to display artificial online state */}
    </div>
  );
};

export default UserProfile;
