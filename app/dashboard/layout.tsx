"use client";

import DashBoardTypeToggler from "@/src/components/Dashboard/global/DashboardToggler/DashboardToggler";
import { AuthContext } from "@/src/contexts/AuthContext";
import HostDashboardContextProvider from "@/src/contexts/HostDashboardContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const { loginToken, userData } = useContext(AuthContext);

  const [accountType, setAccountType] = useState<string | undefined>();

  useEffect(() => {
    console.log(loginToken);
    if (!loginToken) router.push("/login");
    setAccountType(userData?.account_type);
  }, [loginToken]);

  return (
    <>
      <section className="md:max-w-[100%] max-w-full sm:max-w-[95%] m-auto pt-[8rem] lg:pt-[5rem] pb-4 grid grid-rows-[repeat(3,auto)] min-h-screen">
        <Link href="/dashboard">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </Link>
        {(accountType === "host" || accountType === "hostNcandidate") && (
          <DashBoardTypeToggler />
        )}
        {children}
      </section>
    </>
  );
};

export default layout;
