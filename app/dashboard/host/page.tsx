"use client";

import { TUserData } from "@/src/types/application";
import React, { useState, useEffect, useContext } from "react";
import { HostDashBoardContext } from "@/src/contexts/HostDashboardContext";
import { AuthContext } from "@/src/contexts/AuthContext";
import AssociatedCompetitions from "@/src/components/Dashboard/host/AssociatedCompetitions/AssociatedCompetitions";
import AssociatedOrganizations from "@/src/components/Dashboard/host/AssociatedOrganizations/AssociatedOrganizations";

const HostDashBoard: React.FC = () => {
  const { userData: currentUserData } = useContext(AuthContext);
  const { organizationMembershipsToken: membershipsToken } =
    useContext(HostDashBoardContext);

  const [organizationMembershipsToken, setOrganizationMembershipsToken] =
    useState("");
  const [userData, setuserData] = useState<TUserData | undefined>();

  useEffect(() => {
    if (!membershipsToken) return;
    setOrganizationMembershipsToken(membershipsToken);
    setuserData(currentUserData);
  }, [membershipsToken]);

  return (
    <section className=" px-4 pt-2 pb-6 bg-[var(--extraLightBg)] flex flex-col gap-6">
      <div className="flex py-2 col-span-2">
        <h1 className="text-2xl font-semibold">
          Welcome {userData?.username}{" "}
          <span className="hidden text-lg sm:inline">
            &#60;{userData?.email}&#62;
          </span>
        </h1>
      </div>

      {organizationMembershipsToken && (
        <>
            <AssociatedOrganizations />
            <AssociatedCompetitions />
        </>
      )}
    </section>
  );
};

export default HostDashBoard;
