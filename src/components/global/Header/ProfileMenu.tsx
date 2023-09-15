import React, {
  ReactNode,
  useRef,
  useState,
  useContext,
  PropsWithChildren,
} from "react";

import Image from "next/image";

import profileIconImg from "@/public/images/profileIcon.png";
import Link from "next/link";
import { AuthContext } from "@/src/contexts/AuthContext";
import logout from "@/src/utils/global/logout";

interface IProfileMenuLinkProps {
  children: string | ReactNode;
  href: string;
  deactivator: () => void;
  specificStyles?: string;
}

const ProfileMenuLink: React.FC<IProfileMenuLinkProps> = ({
  children,
  href,
  deactivator,
}) => {
  return (
    <Link href={href} onClick={deactivator}>
      <li
        className={`border-2 border-[var(--lightBlue)] rounded-md pl-2 py-[3px] font-semibold hover:bg-[var(--lightBlue)] hover:text-white`}
      >
        {children}
      </li>
    </Link>
  );
};

const LogoutBtn: React.FC = () => {
  return (
    <button
      onClick={logout}
      className={`border-2 border-[var(--lightRed)] rounded-md pl-2 py-[3px] font-semibold hover:bg-[var(--lightRed)] hover:text-white`}
    >
      Log out
    </button>
  );
};

const ProfileMenu = () => {
  const menuRef = useRef<HTMLUListElement>(null);

  const [displayMenu, setDisplayMenu] = useState(false);

  const { loginToken } = useContext(AuthContext);

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
          className={`absolute z-10 top-full right-0 bg-white flex flex-col gap-1 py-2 pl-2 pr-4 min-w-[10rem]`}
        >
          {loginToken ? (
            <>
              <LogoutBtn />
            </>
          ) : (
            <>
              <ProfileMenuLink
                href="/login"
                deactivator={() => setDisplayMenu(false)}
              >
                Login
              </ProfileMenuLink>
              <ProfileMenuLink
                href="/register"
                deactivator={() => setDisplayMenu(false)}
              >
                Register
              </ProfileMenuLink>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
