import CompetitionLink from "@/src/components/global/CompetitionLink/CompetitionLink";
import CompetitionListLayout from "@/src/layouts/CompetitionListLayout";
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
    <CompetitionListLayout title={"Associated Competitions"}>
      {associatedCompetitions.map((competition) => (
        <CompetitionLink
          competitionData={competition}
          key={competition.competition_title}
        />
      ))}
    </CompetitionListLayout>
  );
};

export default AssociatedCompetitions;
