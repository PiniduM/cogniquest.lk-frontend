"use client";

import { TUserData } from "@/src/types/application";
import {
  IAssociatedCompetition,
  TAssociatedCompetitions,
} from "@/src/types/resBodies";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import CompetitionLink from "@/src/components/global/CompetitionLink/CompetitionLink";
import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import Link from "next/link";
import { HostDashBoardContext } from "@/src/contexts/HostDashboardContext";
import { AuthContext } from "@/src/contexts/AuthContext";
import CompetitionsWaitingForApproval from "@/src/components/Dashboard/host/CompetitionsWaitingForApproval/CompetitionsWaitingForApproval";
import CompetitionListLayout from "@/src/layouts/CompetitionListLayout";
import AssociatedCompetitions from "@/src/components/Dashboard/host/AssociatedCompetitions/AssociatedCompetitions";
import NewCompetitionLink from "@/src/components/Dashboard/host/NewCompetitionLink/NewCompetitionLink";

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
    <section className=" px-4 pt-2 pb-6 bg-[var(--extraLightBg)] grid grid-cols-[auto,auto] grid-rows-[auto,auto,1fr] gap-2">
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
          <div className="row-span-3">
            <AssociatedCompetitions
              organizationMembershipsToken={organizationMembershipsToken}
            />
          </div>
          <div className="mb-4">
            <CompetitionsWaitingForApproval
              organizationMembershipsToken={organizationMembershipsToken}
            />
          </div>
          <div className="col-start-1 max-w-xl">
            <NewCompetitionLink />
          </div>
        </>
      )}
    </section>
  );
};

export default HostDashBoard;
