"use client";
import CompetitionsWaitingForApproval from "@/src/components/Dashboard/host/CompetitionsWaitingForApproval/CompetitionsWaitingForApproval";
import MembershipsWaitingForApproval from "@/src/components/Dashboard/host/MembershipsWeitingForApproval/MembershipsWaitingForApproval";
import NewCompetitionPageLink from "@/src/components/Dashboard/host/NewCompetitionLink/NewCompetitionLink";
import { HostDashBoardContext } from "@/src/contexts/HostDashboardContext";
import { IOrganizationData } from "@/src/types/application";
import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const ManageOrganizationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const organizationId = searchParams.get("organization_id");
  if (!organizationId) {
    router.push("/dashboard/host");
    return null;
  }

  const { organizationMembershipsToken } = useContext(HostDashBoardContext);

  const [organizationData, setOrganizationData] = useState<
    IOrganizationData | undefined
  >();

  useEffect(() => {
    if (organizationMembershipsToken) {
      const setupOrganizationData = async () => {
        const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/organization_member/admin/give_organization`;
        const data = { organizationId, organizationMembershipsToken };

        try {
          const response = await axios.post(url, data);
          const result = response.data;
          const { organizationData } = result;
          setOrganizationData(organizationData);
        } catch (err) {
          const error = err as AxiosError;
          console.log(error);
          alert(error.response?.data || "something went wrong");
        }
      };
      setupOrganizationData();
    }
  }, [organizationMembershipsToken]);

  return (
    
    <section className="py-4 px-2 bg-[var(--extraLightBg)] grid gap-4">
      <div className="mb-4">
        <p className="text-lg">Organization ID : <span className="font-semibold">{organizationData?.organization_id}</span></p>
        <p className="text-lg">Organization Name : <span className="font-semibold">{organizationData?.organization_name}</span></p>
      </div>
      <MembershipsWaitingForApproval
        organizationMembershipsToken={organizationMembershipsToken}
        organizationId={organizationId}
      />
      <CompetitionsWaitingForApproval organizationMembershipsToken={organizationMembershipsToken} organizationId={organizationId}/>
      <NewCompetitionPageLink />
    </section>
  );
};

export default ManageOrganizationPage;
