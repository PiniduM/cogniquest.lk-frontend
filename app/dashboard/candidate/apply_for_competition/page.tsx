"use client";

import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, PropsWithChildren } from "react";

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

const ApplyForCompetitionPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const competition_id = searchParams.get("competition_id");
  if (!competition_id) {
    router.push("/dashboard/candidate");
    return null;
  }

  const [competition, setCompetition] = useState<ICompetition>();

  useEffect(() => {
    const setupCompetition = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/general/give_competition`;
      const data = { competition_id };
      try {
        const response = await axios.post(url, data);
        console.log(response);
        const { competition } = response.data;
        if (competition) setCompetition(competition);
      } catch (err) {
        const error = err as AxiosError;
        alert(error.response?.data || "something went wrong");
      }
    };
    setupCompetition();
  }, []);

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

      <button className="bg-[var(--blue)] py-2 px-4 border-none text-white font-semibold">
        Apply
      </button>
    </section>
  );
};

export default ApplyForCompetitionPage;
