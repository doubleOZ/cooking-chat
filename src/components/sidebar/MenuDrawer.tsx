"use client";

import useRoutes from "@/hooks/useRoutes";
import { Transition } from "@headlessui/react";
import { User } from "@prisma/client";
import { useState } from "react";
import UserProfile from "../UserProfile";
import DesktopItem from "./DesktopItem";

interface MenuDrawerProps {
  isMenuOpen: boolean;
  onClose: () => void;
  data: User;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isMenuOpen,
  onClose,
  data,
}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Transition
        show={isMenuOpen}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            className="cursor-pointer hover:opacity-75 transition"
            onClick={() => setIsOpen(true)}
          >
            <UserProfile user={data} />
          </div>
        </nav>
        <nav className="mt-4 flex flex-col justify-between ">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
      </Transition>
    </>
  );
};

export default MenuDrawer;
