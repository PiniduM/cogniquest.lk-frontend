"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import TextInput from "@/src/components/global/Inputs/CustomInput";
import { HostDashBoardContext } from "@/src/contexts/HostDashboardContext";
import AccessibilitySelector from "@/src/components/Dashboard/organization/new_competition/AccessibilitySelector";
import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError, AxiosRequestConfig } from "axios";
import uploadApplicationForm from "@/src/utils/upload/uploadApplicationForm";

interface IAccessibility {
  type: string;
  [key: string]: string;
}

const NewCompetition = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const organizationId = searchParams.get("organization_id");

  if (!organizationId) {
    router.replace("/dashboard/host");
  }

  const { customizedAxiosInstance } = useContext(HostDashBoardContext);

  const selectedAccessibilityRef = useRef<IAccessibility>();
  const updateSelectedAccessibility = (newValue: IAccessibility) => {
    selectedAccessibilityRef.current = newValue;
  };

  const applicationFormInputRef = useRef<HTMLInputElement>(null);
  const submitCompetition = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const competitionTitle = form.competition_title?.value;
    const description = form.description?.value;
    const accessibilityObject = selectedAccessibilityRef.current;
    const applicationForm = form.application_form?.files[0];

    const applicationFormPresent = applicationForm ? true : false;

    const url = `/organization/submit_new_competition`;
    const data = {
      organizationId,
      competitionTitle,
      description,
      accessibilityObject,
      applicationFormPresent,
    };
    try {
      const response = await customizedAxiosInstance.post(url, data);
      const { applicationFormUploadToken } = response.data;
      if (applicationFormUploadToken) {
        alert("successfully submitted, uploading application form");
        try {
          await uploadApplicationForm(
            applicationFormUploadToken,
            applicationForm
          );
          alert("applicationForm uploaded");
        } catch (err) {
          const error = err as AxiosError;
          console.log(error);
          alert(error?.response?.data || "unhandled_error");
        }
      } else {
        alert("successfully submitted");
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };
  return (
    <div className="bg-[var(--extraLightBg)] min-h-screen py-4">
      <div className="max-w-[40rem] px-2 m-auto">
        <h1 className="text-2xl font-semibold mb-4">Start a new competition</h1>
        <form
          encType="multipart/form-data"
          onSubmit={submitCompetition}
          className="bg-white flex flex-col p-2 gap-2"
        >
          {/* regular expressions to be */}
          <TextInput
            name="competition_title"
            label="Competition Title"
            type="text"
          />
          <label className="flex flex-col">
            <span>Description</span>
            <textarea
              name="description"
              className="border-2 border-[var(--lightBlue)]"
            />
          </label>
          <AccessibilitySelector
            valueSynchronizer={updateSelectedAccessibility}
          />
          <label className="flex flex-col">
            <span className="text-lg font-semibold">Application form</span>
            <input
              type="file"
              name="application_form"
              accept=".pdf"
              size={10485760}
              ref={applicationFormInputRef}
              className="border-2 border-[var(--inputBorder)] p-2"
            />
          </label>
          {/* can be arrange to work with google forms */}
          <SubmitButton specificStyles="self-center">Submit</SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default NewCompetition;
