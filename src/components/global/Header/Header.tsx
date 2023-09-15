"use client";
import Image from "next/image";

import Hamburger from "./Hamburger";

import logoImg from "@/public/images/logo.png";
import NavigationBar from "./NavigationBar";
import ProfileMenu from "./ProfileMenu";

const Header: React.FC = () => {
  const toggleNavigationBar = () => {};

  return (
    <header className="relative py-2 pl-16 pr-4 flex justify-between xl:px-[10rem] shadow-md">
      <div className="flex gap-4 items-center">
        <Hamburger clickTrigger={toggleNavigationBar} />
        <Image
          src={logoImg}
          alt="cogniquest logo"
          width={32}
          className="h-auto"
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="hidden sm:block">
          <NavigationBar />
        </div>
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
