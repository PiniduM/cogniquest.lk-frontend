import React, { ReactNode, useRef, useState } from "react";

import Image from "next/image";

import profileIconImg from "@/public/images/profileIcon.png";
import Link from "next/link";

interface IProfileMenuLinkProps {
  children: string | ReactNode;
  href: string;
}

const ProfileMenuLink: React.FC<IProfileMenuLinkProps> = ({
  children,
  href,
}) => {
  return (
    <Link href={href}>
      <li className="border-2 border-[var(--lightBlue)] rounded-md pl-2 py-[3px] font-semibold hover:bg-[var(--lightBlue)] hover:text-white">
        {children}
      </li>
    </Link>
  );
};

const ProfileMenu = () => {
  const menuRef = useRef<HTMLUListElement>(null);

  const [displayMenu, setDisplayMenu] = useState(false);

  return (
    <div className="">
      <div
        onClick={() => setDisplayMenu((prev) => !prev)}
        className="p-1 border-2 border-[var(--lightBlue)] rounded-[0.4rem]"
      >
        <Image src={profileIconImg} alt="profile" width={24} />
      </div>
      {displayMenu && (
        <ul
          ref={menuRef}
          className={`absolute top-full right-0 bg-white flex flex-col gap-1 py-2 pl-2 pr-4 min-w-[8rem]`}
        >
          <ProfileMenuLink href="/login">Login</ProfileMenuLink>
          <ProfileMenuLink href="/register">Register</ProfileMenuLink>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
