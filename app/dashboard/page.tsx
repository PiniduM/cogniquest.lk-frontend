"use client";

import CandidateDashBoard from "@/src/components/CandidateDashBoard/CandidateDashBoard";
import HostDashBoard from "@/src/components/HostDashboard/HostDashBoard";
import { AuthContext } from "@/src/contexts/AuthContext";
import { TUserData } from "@/src/types/application";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

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
