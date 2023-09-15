import CompetitionLink from "@/src/components/global/CompetitionLink/CompetitionLink";
import CompetitionListLayout from "@/src/layouts/CompetitionListLayout";
import { TCompetitionsWaitingForApprovalREsponseData } from "@/src/types/resBodies";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface IProps {
  organizationMembershipsToken: string;
}

const CompetitionsWaitingForApproval: React.FC<IProps> = ({
  organizationMembershipsToken,
}) => {
  const [competitions, setCompetitions] =
    useState<TCompetitionsWaitingForApprovalREsponseData>([]);

  useEffect(() => {
    const setupCompetitions = async () => {
      const utl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/organization_member/admin/give_competitions_waiting_for_approval`;
      const data = { organizationMembershipsToken };
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
  },[]);

  return (
    <CompetitionListLayout title="Competitions Waiting for Approval">
      {competitions.map((competition) => (
        <CompetitionLink
          competitionData={competition}
          callToAction="Approve"
          key={competition.competition_title}
        />
      ))}
    </CompetitionListLayout>
  );
};

export default CompetitionsWaitingForApproval;
