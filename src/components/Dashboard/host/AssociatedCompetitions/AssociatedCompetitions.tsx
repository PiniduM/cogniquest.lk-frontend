import CompetitionCard from "@/src/components/Dashboard/global/CompetitionCard/CompetitionCard";
import { HostDashBoardContext } from "@/src/contexts/HostDashboardContext";
import CardListLayout from "@/src/layouts/CardListLayout";
import {
  ICompetition,
  TAssociatedCompetitions,
} from "@/src/types/resBodies";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AssociatedCompetitions = () => {
  const { customizedAxiosInstance, organizationMembershipsToken } =
    useContext(HostDashBoardContext);

  const [associatedCompetitions, setAssociatedCompetitions] = useState<
    ICompetition[]
  >([]);

  useEffect(() => {
    const setupAssociatedCompettions = async () => {
      const url = `/organization_member/give_associated_competitions`;
      const data = {};

      try {
        const response = await customizedAxiosInstance.post(url, data);
        const associatedCompetitions = response.data as TAssociatedCompetitions;
        setAssociatedCompetitions(associatedCompetitions);
      } catch (error) {
        alert("something went wrong with associated competitions");
      }
    };
    setupAssociatedCompettions();
  }, [organizationMembershipsToken]);

  return (
    <CardListLayout title={"Associated Competitions"}>
      {associatedCompetitions.map((competition) => (
        <CompetitionCard
          competitionData={competition}
          key={competition.competition_title}
          callToAction="Manage"
        />
      ))}
    </CardListLayout>
  );
};

export default AssociatedCompetitions;
