"use client";

import React, { useState, useEffect, useContext } from "react";
import {
  AuthContext,
  IcontextValues as IAuthContextValues,
} from "@/src/contexts/AuthContext";
import { HostDashBoardContext } from "@/src/contexts/HostDashboardContext";
import AssociatedCompetitions from "@/src/components/Dashboard/host/AssociatedCompetitions/AssociatedCompetitions";
import AssociatedOrganizations from "@/src/components/Dashboard/host/AssociatedOrganizations/AssociatedOrganizations";
import { TUserData } from "@/src/types/application";

type JwtPayload = {
  // Example structure of JwtPayload
  email: string;
  user_id: string;
  username: string;
  account_type: string;
};

const HostDashBoard: React.FC = () => {
  const { userData: currentUserData } =
    useContext<IAuthContextValues>(AuthContext);
  const { organizationMembershipsToken: membershipsToken } =
    useContext(HostDashBoardContext);

  const [organizationMembershipsToken, setOrganizationMembershipsToken] =
    useState<string>("");
  const [userData, setUserData] = useState<TUserData | undefined>(undefined);

  const transformUserData = (userData: any): TUserData => {
    // Extract necessary fields and create a TUserData object
    const { email, user_id, username, account_type } = userData;
    return {
      email: email || "",
      user_id: user_id || "",
      username: username || "",
      account_type: account_type || "",
    };
  };

  // Inside your component
  useEffect(() => {
    if (!membershipsToken || !currentUserData) return;

    setOrganizationMembershipsToken(membershipsToken);

    // Transform JwtPayload to match TUserData structure
    const transformedUserData = transformUserData(currentUserData);
    setUserData(transformedUserData);
  }, [membershipsToken, currentUserData]);

  return (
    <section className="px-4 pt-2 pb-6 bg-[var(--extraLightBg)] flex flex-col gap-6">
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
