"use client";

import useRoutes from "@/hooks/useRoutes";
import { User } from "@prisma/client";
import { Menu } from "lucide-react";
import { useState } from "react";
import MenuDrawer from "./MenuDrawer";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // this is the left most sidebar (move this into a modal)
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-start">
        <div
          className="justify-center flex  items-center pt-5 text-neutral-400 hover:text-neutral-600"
          onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}
        >
          <div>
            <Menu />
          </div>
        </div>
        <MenuDrawer
          isMenuOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          data={currentUser}
        />
      </div>
    </>
  );
};

export default DesktopSidebar;
