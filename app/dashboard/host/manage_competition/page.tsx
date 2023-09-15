"use client";

import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import delayedReload from '@/src/utils/global/delayedReload'
import { DashBoardContext } from "@/src/contexts/DashboardContext";
import {
  ICompetition,
  TGiveCompetitionResponseData,
} from "@/src/types/resBodies";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  MouseEventHandler,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const Detail: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-white p-2 rounded-md font-semibold text-lg">
      {children}
    </div>
  );
};

const page = () => {
  const { organizationMembershipsToken, organizationMemberships } =
    useContext(DashBoardContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const competition_id = searchParams.get("competition_id");

  const [competition, setCompetition] = useState<ICompetition>();

  useEffect(() => {
    if (!competition_id) {
      router.push("/dashboard/host");
      return;
    }

    if (!organizationMembershipsToken) return;

    const setupcompetition = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/organization_member/give_competition`;
      const data = { competition_id, organizationMembershipsToken };
      try {
        const response = await axios.post(url, data);
        const { competition } = response.data as TGiveCompetitionResponseData;
        setCompetition(competition);
        console.log(competition);
      } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        alert(error.response?.data || "something went wrong");
      }
    };
    setupcompetition();
  }, [organizationMembershipsToken]);

  if (!competition)
    return (
      <Detail>
        <p>loading ...</p>
      </Detail>
    );

  const {
    competition_title,
    description,
    status,
    admin_approved,
    system_approved,
    accessibility,
    allowed_candidates,
    application_form_link,
    assest_type,
    competition_link,
    organization_id,
    passcode,
  } = competition;

  const isAdmin = organizationMemberships?.some(
    (membership) =>
      membership.organization_id === organization_id &&
      membership.role === "admin"
  );

  const handleApproval:MouseEventHandler<HTMLButtonElement> = isAdmin
    ? async (e) => {
        const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/organization_member/admin/approve_competition`;
        const data = { competition_id, organizationMembershipsToken };

        try {
          await axios.post(url, data);
          alert("Admin Approval given and submitted for system approval");
          router.push('/dashboard/host');
        } catch (err) {
          const error = err as AxiosError;
          console.log(error);
          alert(error.response?.data || "something went wrong");
        }
      }
    : (e) => {};

  return (
    <div className="border rounded-lg p-8 shadow-md bg-[var(--extraLightBg)]">
      <h2 className="text-xl font-semibold mb-2">{competition_title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-2 flex flex-col gap-2 max-w-[40rem]">
        <Detail>
          <p>
            Status:{" "}
            <span
              className={`px-2 py-1 rounded-full ${
                status === "Active"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {status}
            </span>
          </p>
        </Detail>
        <Detail>
          <p>
            Admin Approved:{" "}
            <span
              className={`ml-2 ${
                admin_approved === "Y" ? "text-green-500" : "text-red-500"
              }`}
            >
              {admin_approved}
            </span>
          </p>
        </Detail>
        <Detail>
          <p>
            System Approved:{" "}
            <span
              className={`ml-2 ${
                system_approved === "Y" ? "text-green-500" : "text-red-500"
              }`}
            >
              {system_approved}
            </span>
          </p>
        </Detail>
        <Detail>
          <p>Accessibility: {accessibility}</p>
        </Detail>
        <Detail>
          <p>Allowed Candidates: {allowed_candidates || "None"}</p>
        </Detail>
        <Detail>
          <p>
            Application Form Link:{" "}
            {status === "applying" ? (
              <a href={application_form_link} className="text-blue-500">
                {application_form_link}
              </a>
            ) : (
              <span>{application_form_link}</span>
            )}
          </p>
        </Detail>
        <Detail>
          <p>Asset Type: {assest_type}</p>
        </Detail>
        <Detail>
          <p>Competition ID: {competition_id}</p>
        </Detail>
        <Detail>
          <p>
            Competition Link:{" "}
            {status !== "pending" ? (
              <a href={competition_link} className="text-blue-500">
                {competition_link}
              </a>
            ) : (
              <span>{competition_link}</span>
            )}
          </p>
        </Detail>
        <Detail>
          <p>Organization ID: {organization_id}</p>
        </Detail>
        <Detail>
          <p>Passcode: {passcode || "None"}</p>
        </Detail>
      </div>
      {isAdmin && admin_approved === "N" && (
        <div className="flex gap-2 items-center">
          <button
            onClick={handleApproval}
            className="bg-[var(--blue)] text-white p-2 rounded-lg"
          >
            Approve
          </button>
          <p className="text-red-700">This action cannot be reversed</p>
        </div>
      )}
      {
        admin_approved === 'Y' && system_approved === 'N' && (
          <p className="font-semibold text-gray-500">The competition hosting request is currently under processing. Wait till the system approval.</p>
        )
      }
    </div>
  );
};

export default page;
