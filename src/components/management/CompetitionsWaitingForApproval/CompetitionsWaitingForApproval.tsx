import CompetitionLink from "@/src/components/global/CompetitionLink/CompetitionLink";
import CompetitionListLayout from "@/src/layouts/CompetitionListLayout";
import { TCompetitionsWaitingForApprovalREsponseData } from "@/src/types/resBodies";
import delayedReload from "@/src/utils/global/delayedReload";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

interface IProps {
  managementToken: string;
}

const CompetitionsWaitingForApproval: React.FC<IProps> = ({
  managementToken,
}) => {
  const [competitions, setCompetitions] =
    useState<TCompetitionsWaitingForApprovalREsponseData>([]);

  const setupCompetitions = async () => {
    const utl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/management/give_competitions_waiting_for_approval`;
    const data = { managementToken };
    try {
      const response = await axios.post(utl, data);
      const { competitions } = response.data;
      setCompetitions(competitions);
    } catch (error) {
      alert("something went wrong");
      console.log(error);
    }
  };
  useEffect(() => {
    setupCompetitions();
  }, []);

  const approveCompetition = async (competition_id: string) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/management/approve_competition`;
    const data = { competition_id, managementToken };

    try {
      await axios.post(url, data);
      alert("approved");
      setupCompetitions();
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      alert(error.response?.data || "something went wrong");
    }
  };

  return (
    <CompetitionListLayout title="Competitions Waiting for Approval">
      {competitions.map((competition) => (
        <CompetitionLink
          competitionData={competition}
          callToAction="Approve"
          onClick={() => approveCompetition(competition.competition_id)}
          key={competition.competition_title}
        />
      ))}
    </CompetitionListLayout>
  );
};

export default CompetitionsWaitingForApproval;
