import { CandidateDashboardContext } from "@/src/contexts/CandidateDashboardContext";
import { AxiosError } from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";
import ApplicationSection from "./ApplicationSection";
import PostApplicationSubmissionSection from "./PostApplicationSubmissionSection";
import ProjectSubmissionSection from "./ProjectSubmissionSection";
import PostSubmissionSection from "./PostSubmissionSection";

interface IProps {
  competitionId: string;
}

interface IParticipationStatus {
  status: string;
  applicationId?: string;
  appliedTime?: string;
  submittedTime?: string;
}
//use a more strict type annotation with or merges if necessary

const InteractionManager: React.FC<IProps> = ({ competitionId }) => {
  const { customizedAxiosInstance } = useContext(CandidateDashboardContext);

  const [participationStatus, setParticipationStatus] =
    useState<IParticipationStatus>({ status: "" });

  const setupParticipationStatus = useCallback(async () => {
    const url = `/candidate/give_participation_status`;
    const data = { competitionId };
    try {
      const response = await customizedAxiosInstance?.post(url, data);
      const { participationStatus } = response?.data;
      console.log(response?.data);
      setParticipationStatus(participationStatus);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      alert(error.response?.data || "unexpected_error");
    }
  }, [competitionId]);

  useEffect(() => {
    setupParticipationStatus();
  }, [competitionId]);

  const {
    status: rawParticipationStatus,
    applicationId,
    appliedTime,
    submittedTime,
  } = participationStatus;
  console.log(rawParticipationStatus);
  switch (rawParticipationStatus) {
    case "not_applied": {
      return (
        <ApplicationSection
          competitionId={competitionId}
          participationStatusResetFunction={setupParticipationStatus}
        />
      );
    }
    case "application_is_waiting_for_approval": {
      return (
        <PostApplicationSubmissionSection
          participationStatusResetFunction={setupParticipationStatus}
        />
      );
    }
    case "waiting_for_project_submission": {
      return (
        <ProjectSubmissionSection
          applicationId={applicationId as string}
          participationStatusResetFunction={setupParticipationStatus}
        />
      );
    }
    case "project_submitted": {
      return (
        <PostSubmissionSection
          participationStatusResetFunction={setupParticipationStatus}
        />
      );
    }
    default: {
      return (
        <div className="flex justify-center align-middle">
          <p className="text-xl text-gray-600">Loading ...</p>
        </div>
      );
    }
  }
};

export default InteractionManager;
