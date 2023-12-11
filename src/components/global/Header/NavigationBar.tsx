import Button from "@/src/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface INavlinkProps {
  href: string;
  children: ReactNode;
}

const Navlink: React.FC<INavlinkProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      <p className="v-nav_link text-center">{children}</p>
    </Link>
  );
};

interface IProps {}

const NavigationBar: React.FC<IProps> = () => {
  return (
    <nav
      className={`sm:h-full overflow-hidden m-auto  flex lg:h-auto flex-col sm:flex-row dark:text-tertiary-light text-[#696969] text-lg  p-5 gap-3 sm:p-0 sm:gap-10 sm:mr-4`}
    >
      <Navlink href="/">Home</Navlink>
      <Navlink href="/competitions">Competitions</Navlink>
      <Navlink href="/dashboard">Dashboard</Navlink>
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
    </nav>
  );
};

export default NavigationBar;
