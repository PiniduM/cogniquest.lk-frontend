"use client";
import MembershipsWaitingForApproval from "@/src/components/Dashboard/organization/MembershipsWeitingForApproval/MembershipsWaitingForApproval";
import LinkToNewCompwtitionPage from "@/src/components/Dashboard/organization/LinkToNewCompetitionPage/LinkToNewCompetitinPage";
import { HostDashBoardContext } from "@/src/contexts/HostDashboardContext";
import { IOrganizationData } from "@/src/types/application";
import { AxiosError } from "axios";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import CompetitionsWaitingForApproval from "@/src/components/Dashboard/organization/CompetitionsWaitingForApproval/CompetitionsWaitingForApproval";

const ManageOrganizationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const organizationId = searchParams.get("organization_id");
  if (!organizationId) {
    router.push("/dashboard/host");
    return null;
  }

  const { organizationMembershipsToken, customizedAxiosInstance } =
    useContext(HostDashBoardContext);

  const [organizationData, setOrganizationData] = useState<
    IOrganizationData | undefined
  >();

  useEffect(() => {
    if (organizationMembershipsToken) {
      const setupOrganizationData = async () => {
        const url = `/organization/admin/give_organization`;
        const data = { organizationId };

        try {
          const response = await customizedAxiosInstance.post(url, data);
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
        <p className="text-lg">
          Organization ID :{" "}
          <span className="font-semibold">
            {organizationData?.organization_id}
          </span>
        </p>
        <p className="text-lg">
          Organization Name :{" "}
          <span className="font-semibold">
            {organizationData?.organization_name}
          </span>
        </p>
      </div>
      <MembershipsWaitingForApproval organizationId={organizationId} />
      <CompetitionsWaitingForApproval
        organizationId={organizationId}
      ></CompetitionsWaitingForApproval>
      <LinkToNewCompwtitionPage organizationId={organizationId} />
    </section>
  );
};

export default ManageOrganizationPage;
