"use client";
import React, { useState } from "react";
import Image from "next/image";
import NavigationBar from "./NavigationBar";
import Button from "@/src/ui/button";
import logoImg from "@/public/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; // Changed faXmark to faTimes

const Header: React.FC = () => {
  const [showNav, setShowNav] = useState(false);

  const toggleNavigationBar = () => {
    setShowNav(!showNav);
  };

  return (
    <>
      <header className="flex-row w-full mx-auto absolute flex justify-between px-3 xl:px-[5rem] md:px-[2rem] sm:px-[1rem] mt-4 z-10">
        <div className="flex gap-4 items-center">
          <h1 className="title capitalize font-bold text-2xl text-tertiary-light">
            COGNIQUEST
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="sm:hidden">
            {/* Button to toggle navigation */}
            <Button
              style={{
                color: "rgba(0, 0, 0, 1)",
                background:
                  "linear-gradient(rgba(238, 235, 111, 1), rgba(254, 217, 5, 1), rgba(254, 196, 5, 1))",
              }}
              onClick={toggleNavigationBar}
            >
              <FontAwesomeIcon icon={showNav ? faTimes : faBars} />
            </Button>
          </div>
          {/* Navigation bar */}

          <div
            className={`sm:flex flex-row items-center gap-4 hidden flex-xol ${
              showNav ? "flex" : "hidden"
            }`}
          >
            <NavigationBar />
          </div>
        </div>
      </header>
      <div
        className={`flex flex-row items-center gap-4 transition-height duration-300 sm:hidden absolute bg-[#0000004b] top-16 w-full z-10 overflow-hidden max-h-52 ${
          showNav ? "h-full" : "h-0"
        }`}
      >
        <NavigationBar />
      </div>
    </>
  );
};

export default Header;
