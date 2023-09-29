"use client";

import CardListLayout from "@/src/layouts/CardListLayout";
import { TPubliclyAvailbleCompetitions } from "@/src/types/resBodies";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import CompetitionCard from "../../Dashboard/global/CompetitionCard/CompetitionCard";

const PubliclyAvailbleCompetitions = () => {
  const router = useRouter();
  const [publiclyAvailabeCompetions, setPubliclyAvailabeCompetitions] =
    useState<TPubliclyAvailbleCompetitions>([]);

  useEffect(() => {
    const setupPubliclyAvailabeCompetitions = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/general/give_publicly_available_competitions`;
      try {
        const response = await axios.post(url);
        const { competitions } = response.data;
        if (competitions) setPubliclyAvailabeCompetitions(competitions);
      } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        alert(error.response?.data || "something went wrong");
      }
    };
    setupPubliclyAvailabeCompetitions();
  }, []);

  const handleClick = async (competition_id: string) => {
    router.push(
      `/dashboard/candidate/competition?competition_id=${competition_id}`
    );
  };

  return (
    <section className="pt-6 p-2">
      <CardListLayout title="Publicly Available Competitions">
        {publiclyAvailabeCompetions.map((competition) => (
          <CompetitionCard
            key={competition.competition_id}
            competitionData={competition}
            callToAction="Details"
            onClick={() => handleClick(competition.competition_id)}
          />
        ))}
      </CardListLayout>
    </section>
  );
};

export default PubliclyAvailbleCompetitions;
