"use client";
import CompetitionLink from "@/src/components/global/CompetitionLink/CompetitionLink";
import { AuthContext } from "@/src/contexts/AuthContext";
import CompetitionListLayout from "@/src/layouts/CompetitionListLayout";
import { TPubliclyAvailbleCompetitions } from "@/src/types/resBodies";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";

const page = () => {

    const router = useRouter();
  const { loginToken } = useContext(AuthContext);
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
    router.push(`/dashboard/candidate/apply_for_competition?competition_id=${competition_id}`)
  }

  return (
    <section className="pt-6 p-2">
      <h1 className="text-3xl font-semibold">Publicly available competitions</h1>
      <CompetitionListLayout title="">
        {publiclyAvailabeCompetions.map((competition) => (
          <CompetitionLink 
          competitionData={competition}
          callToAction="Details"
        onClick={() => handleClick(competition.competition_id)}/>
        ))}
      </CompetitionListLayout>
    </section>
  );
};

export default page;
