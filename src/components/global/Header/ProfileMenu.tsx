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
import Button from "@/src/ui/button";

interface IProfileMenuLinkProps {
  children: string | ReactNode;
  href: string;
  deactivator: () => void;
  specificStyles?: string;
}

const ProfileMenuLink: React.FC<IProfileMenuLinkProps> = ({
  children,
  href,
}) => {
  return <Link href={href}>{children}</Link>;
};

const LogoutBtn: React.FC = () => {
  return (
    <Button
      style={{
        borderRadius: 45,
        background:
          "linear-gradient(45deg ,rgba(238, 235, 111, 1), rgba(254, 217, 5, 1), rgba(254, 196, 5, 1))",
        maxWidth: 500,
      }}
      onClick={logout}
      // className={`border-2 border-[var(--lightRed)] rounded-md pl-2 py-[3px] font-semibold hover:bg-[var(--lightRed)] hover:text-white`}
    >
      Log out
    </Button>
  );
};

const ProfileMenu = () => {
  const menuRef = useRef<HTMLUListElement>(null);

  const [displayMenu, setDisplayMenu] = useState(false);

  const { loginToken } = useContext(AuthContext);

  return (
    <>
      {loginToken ? (
        <>
          <LogoutBtn />
        </>
      ) : (
        <>
          <Button
            style={{
              borderRadius: 45,
              background:
                "linear-gradient(45deg ,rgba(238, 235, 111, 1), rgba(254, 217, 5, 1), rgba(254, 196, 5, 1))",
              maxWidth: 500,
            }}
            onClick={() => {}}
          >
            <ProfileMenuLink
              href="/login"
              deactivator={() => setDisplayMenu(false)}
            >
              Login
            </ProfileMenuLink>
          </Button>
          <Button
            style={{
              borderRadius: 45,
              background:
                "linear-gradient(45deg ,rgba(238, 235, 111, 1), rgba(254, 217, 5, 1), rgba(254, 196, 5, 1))",
              maxWidth: 500,
            }}
            onClick={() => {}}
          >
            <ProfileMenuLink
              href="/register"
              deactivator={() => setDisplayMenu(false)}
            >
              Register
            </ProfileMenuLink>
          </Button>
        </>
      )}
    </>
  );
};

export default ProfileMenu;
