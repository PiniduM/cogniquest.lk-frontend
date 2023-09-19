import CompetitionCard from "@/src/components/Dashboard/host/CompetitionCard/CompetitionCard";
import CardListLayout from "@/src/layouts/CardListLayout";
import {
  IAssociatedCompetition,
  TAssociatedCompetitions,
} from "@/src/types/resBodies";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface IProps {
  organizationMembershipsToken: string;
}

const AssociatedCompetitions = ({ organizationMembershipsToken }: IProps) => {
  const [associatedCompetitions, setAssociatedCompetitions] = useState<
    IAssociatedCompetition[]
  >([]);

  useEffect(() => {
    const setupAssociatedOrganizations = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/organization_member/give_associated_competitions`;
      const data = { organizationMembershipsToken };

      try {
        const response = await axios.post(url, data);
        const associatedCompetitions = response.data as TAssociatedCompetitions;
        setAssociatedCompetitions(associatedCompetitions);
      } catch (error) {
        alert("something went wrong with associated competitions");
      }
    };
    setupAssociatedOrganizations();
  }, []);

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
