import Link from "next/link";
import { ReactNode } from "react";

interface INavlinkProps {
  href: string;
  children: ReactNode;
}
const Navlink: React.FC<INavlinkProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      <p className="v-nav_link">{children}</p>
    </Link>
  );
};

interface Iprops {}
const NavigationBar: React.FC<Iprops> = () => {
  return (
    <nav className="flex text-primary font-semibold text-lg gap-2">
      <Navlink href="/">Home</Navlink>
      <Navlink href="/competitions">Competitions</Navlink>
      <Navlink href="/dashboard">Dashboard</Navlink>
    </nav>
  );
};

export default NavigationBar;
