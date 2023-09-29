import CompetitionCard from "@/src/components/Dashboard/global/CompetitionCard/CompetitionCard";
import { HostDashBoardContext } from "@/src/contexts/HostDashboardContext";
import CardListLayout from "@/src/layouts/CardListLayout";
import { TAssociatedOrganizations } from "@/src/types/resBodies";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import OrganizationCard from "./OrganizationCard";

const AssociatedOrganizations = () => {
  const { customizedAxiosInstance, organizationMembershipsToken } =
    useContext(HostDashBoardContext);

  const [associatedOrganizations, setAssociatedOrganizations] =
    useState<TAssociatedOrganizations>([]);

  useEffect(() => {
    const setupAssociatedOrganizations = async () => {
      const url = `/organization_member/give_associated_organizations`;
      const data = {};

      try {
        const response = await customizedAxiosInstance.post(url, data);
        const { associatedOrganizations } = response.data;
        setAssociatedOrganizations(associatedOrganizations);
        console.log(associatedOrganizations);
      } catch (error) {
        alert("something went wrong with associated organizations");
      }
    };
    setupAssociatedOrganizations();
  }, [organizationMembershipsToken]);

  return (
    <CardListLayout title={"Associated Organizations"}>
      {associatedOrganizations.map((organization) => (
        <OrganizationCard
          key={organization.organizationId}
          organizationData={organization}
          callToAction="Manage"
        />
      ))}
    </CardListLayout>
  );
};

export default AssociatedOrganizations;
