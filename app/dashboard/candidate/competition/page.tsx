"use client";

import InteractionManager from "@/src/components/Dashboard/candidate/competition/InteractionManager";
import { CandidateDashboardContext } from "@/src/contexts/CandidateDashboardContext";
import axios, { AxiosError, AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, {
  useEffect,
  useState,
  PropsWithChildren,
  useContext,
} from "react";

interface ICompetition {
  competition_id: string;
  competition_title: string;
  accessibility: string;
  description: string;
  assest_type: string;
}

const Detail: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-white p-2 rounded-md font-semibold text-lg">
      {children}
    </div>
  );
};

const CompetitionPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const competitionId = searchParams.get("competition_id");
  if (!competitionId) {
    router.push("/dashboard/candidate");
    return null;
  }

  const { candidateToken, customizedAxiosInstance } = useContext(
    CandidateDashboardContext
  );

  const [competition, setCompetition] = useState<ICompetition>();

  useEffect(() => {
    if (!candidateToken) {
      return;
    }
    const setupCompetition = async () => {
      const url = `candidate/give_competition`;
      const data = { competitionId };
      try {
        const response = await (customizedAxiosInstance as AxiosInstance).post(
          url,
          data
        );
        console.log(response);
        const { competition } = response.data;
        if (competition) setCompetition(competition);
      } catch (err) {
        const error = err as AxiosError;
        alert(error.response?.data || "something went wrong");
      }
    };
    setupCompetition();
  }, [candidateToken]);

  if (!competition) return null;

  const { competition_title, description, accessibility, assest_type } =
    competition;

  return (
    <section className="border rounded-lg p-8 shadow-md bg-[var(--extraLightBg)]">
      <h2 className="text-xl font-semibold mb-2">{competition_title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-2 flex flex-col gap-2 max-w-[40rem]">
        <Detail>
          <p>Accessibility: {accessibility}</p>
        </Detail>

        <Detail>
          <p>Asset Type: {assest_type}</p>
        </Detail>
      </div>
      <InteractionManager competitionId={competitionId} />
    </section>
  );
};

export default CompetitionPage;
