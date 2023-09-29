import CompetitionCard from "@/src/components/Dashboard/global/CompetitionCard/CompetitionCard";
import { HostDashBoardContext } from "@/src/contexts/HostDashboardContext";
import CardListLayout from "@/src/layouts/CardListLayout";
import { ICompetitionWaitingForApproval } from "@/src/types/application";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

interface IProps {
  organizationId: string;
}

const CompetitionsWaitingForApproval: React.FC<IProps> = ({
  organizationId,
}) => {
  const { organizationMembershipsToken, customizedAxiosInstance } =
    useContext(HostDashBoardContext);

  const [competitions, setCompetitions] = useState<
    ICompetitionWaitingForApproval[]
  >([]);

  useEffect(() => {
    if (organizationMembershipsToken) {
      const setupCompetitions = async () => {
        const utl = `/organization/admin/give_competitions_waiting_for_approval`;
        const data = { organizationId };
        try {
          const response = await customizedAxiosInstance.post(utl, data);
          const { competitions } = response.data;
          setCompetitions(competitions);
        } catch (error) {
          alert("something went wrong");
          console.log(error);
        }
      };

      setupCompetitions();
    }
  }, [organizationMembershipsToken]);

  return (
    <CardListLayout title="Competitions Waiting for admin's Approval">
      {competitions.map((competition) => (
        <CompetitionCard
          competitionData={competition}
          callToAction="Approve"
          key={competition.competition_title}
        />
      ))}
    </CardListLayout>
  );
};

export default CompetitionsWaitingForApproval;
