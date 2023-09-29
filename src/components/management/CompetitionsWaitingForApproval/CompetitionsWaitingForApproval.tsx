import CompetitionCard from "@/src/components/Dashboard/global/CompetitionCard/CompetitionCard";
import CardListLayout from "@/src/layouts/CardListLayout";
import { TCompetitionsWaitingForApproval } from "@/src/types/resBodies";
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
    useState<TCompetitionsWaitingForApproval>([]);

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
    <CardListLayout title="Competitions Waiting for Approval">
      {competitions.map((competition) => (
        <CompetitionCard
          competitionData={competition}
          callToAction="Approve"
          onClick={() => approveCompetition(competition.competition_id)}
          key={competition.competition_title}
        />
      ))}
    </CardListLayout>
  );
};

export default CompetitionsWaitingForApproval;
