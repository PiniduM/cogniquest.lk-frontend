'use client'
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  competitionData: {
    competition_id: string;
    competition_title: string;
    accessibility: string;
    status: string;
    organization_name: string;
  };
  callToAction?: string;
  onClick? : () => void;
}

const CompetitionLink: React.FC<IProps> = ({ competitionData,callToAction,onClick }) => {
  const router = useRouter();

  const { competition_id, competition_title, accessibility, status, organization_name } =
    competitionData;
  
  const navigateToCompetition = () => {
    router.push(`/dashboard/host/manage_competition?competition_id=${competition_id}`)
  }


    return (
    <div className="grid px-2 py-2 bg-[var(--extraLightBg)] rounded-md">
      <div className="flex justify-between w-full mb-2">
        <h3 className="font-semibold text-xl">{competition_title}</h3> <p className="text-md font-semibold relative translate-y-[-0.3rem]">by {organization_name}</p>
      </div>
      <div className="grid grid-cols-[1fr,auto]">
        <div className="grid grid-cols-[1fr,1fr]">
          <p>Accessibility: {accessibility}</p>
          <p>Status: {status}</p>
        </div>

        <button 
        onClick={onClick || navigateToCompetition}
        className="h-ful text-white font-semibold p-2 bg-[var(--blue)] border-none">
            <span>{callToAction || 'Manage'}</span>

        </button>
      </div>
    </div>
  );
};

export default CompetitionLink;
