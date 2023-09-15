'use client'

import DashBoardTypeToggler from "@/src/components/Dashboard/DashboardToggler";
import { AuthContext } from "@/src/contexts/AuthContext";
import DashboardContextProvider from "@/src/contexts/DashboardContext";
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

  const [accountType,setAccountType] = useState<string | undefined>();

  useEffect(() => {
    console.log(loginToken);
    if (!loginToken) router.push("/login");
    setAccountType(userData?.account_type);
  }, []);

  return (
    <DashboardContextProvider>
      <>
        <section className="flex justify-between py-2 px-4 bg-[var(--lightBlue)]">
          <Link href='/dashboard'><h1 className="text-2xl font-semibold">Dashboard</h1></Link>
          {(accountType === "host" || accountType === 'hostNcandidate') && <DashBoardTypeToggler />}
        </section>
        {children}
      </>
    </DashboardContextProvider>
  );
};

export default layout;
