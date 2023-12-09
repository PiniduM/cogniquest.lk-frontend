"use client";
import Image from "next/image";

import Hamburger from "./Hamburger";

import logoImg from "@/public/images/logo.png";
import NavigationBar from "./NavigationBar";
import ProfileMenu from "./ProfileMenu";
import Button from "@/src/ui/button";

const Header: React.FC = () => {
  const toggleNavigationBar = () => {};

  return (
    <header className="max-w-screen-2xl flex-row w-full mx-auto absolute flex justify-between xl:px-[5rem] md:px-[2rem] sm:px-[1rem] mt-4">
      <div className="flex gap-4 items-center">
        {/* <Hamburger clickTrigger={toggleNavigationBar} /> */}
        {/* <Image
          src={logoImg}
          alt="cogniquest logo"
          width={32}
          className="h-auto"
        /> */}
        <h1 className="title capitalize font-bold text-2xl">COGNIQUEST</h1>
      </div>
      <div className="flex gap-4 items-center">
        <div className="hidden sm:flex flex-row items-center gap-4">
          <NavigationBar />
          <Button
            style={{
              color: "rgba(0, 0, 0, 1)",
              background:
                "linear-gradient(rgba(238, 235, 111, 1), rgba(254, 217, 5, 1), rgba(254, 196, 5, 1))",
            }}
            onClick={() => {}}
          >
            Login
          </Button>
        </div>
        {/* <ProfileMenu /> */}
      </div>
    </header>
  );
};

export default Header;
