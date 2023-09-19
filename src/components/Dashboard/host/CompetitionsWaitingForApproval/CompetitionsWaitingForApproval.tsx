import CompetitionCard from "@/src/components/Dashboard/host/CompetitionCard/CompetitionCard";
import CardListLayout from "@/src/layouts/CardListLayout";
import { ICompetitionWaitingForApproval } from "@/src/types/application";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface IProps {
  organizationMembershipsToken?: string;
  organizationId: string;
}

const CompetitionsWaitingForApproval: React.FC<IProps> = ({
  organizationMembershipsToken,
  organizationId,
}) => {
  const [competitions, setCompetitions] = useState<
    ICompetitionWaitingForApproval[]
  >([]);

  useEffect(() => {
    if (organizationMembershipsToken) {
      const setupCompetitions = async () => {
        const utl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/organization_member/admin/give_competitions_waiting_for_approval`;
        const data = { organizationMembershipsToken, organizationId };
        try {
          const response = await axios.post(utl, data);
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
