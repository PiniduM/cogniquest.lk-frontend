"use client";

import { AuthContext } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect,useContext } from "react";

const DashboaderPage = () => {
  const router = useRouter();

  const { userData } = useContext(AuthContext);

  useEffect(() => {
    if (userData?.account_type === "candidate")
      router.replace("/dashboard/candidate");
    else router.replace("/dashboard/host");
  }, []);

  return null;
  //add content for seo
};

export default DashboaderPage;
