"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  organizationData: {
    organizationId: string;
    organizationName: string;
  };
  callToAction?: string;
  onClick?: () => void;
}

const OrganizationCard: React.FC<IProps> = ({
  organizationData,
  callToAction,
  onClick,
}) => {
  const router = useRouter();

  const { organizationId, organizationName } = organizationData;

  const navigateToCompetition = () => {
    router.push(
      `/dashboard/host/manage_organization?organization_id=${organizationId}`
    );
  };

  return (
    <div className="grid px-2 py-2 bg-[var(--extraLightBg)] rounded-md">
      <div className="flex justify-between w-full mb-2">
        <h3 className="font-semibold text-xl">{organizationName}</h3>{" "}
        <p className="text-md font-semibold relative translate-y-[-0.3rem]">
          organization ID: {organizationId}
        </p>
      </div>
      <div className="grid grid-cols-[1fr,auto]">
        <div className="grid grid-cols-[1fr,1fr]">
          <p>Admin: MR.A.B.abcdsdad</p>
        </div>
        {callToAction && (
          <button
            onClick={onClick || navigateToCompetition}
            className="h-ful text-white font-semibold p-2 bg-[var(--blue)] border-none"
          >
            <span>{callToAction || "view"}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default OrganizationCard;
