"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import TextInput from "@/src/components/global/Inputs/CustomInput";
import { DashBoardContext } from "@/src/contexts/HostDashboardContext";
import axios from "axios";
import SelectionInput from "@/src/components/global/Inputs/SelectionInput";
import { TAssociatedOrganizations } from "@/src/types/application";
import { validAccessibilities } from "@/src/validators/competitions";
import AccessibilitySelector from "@/src/components/Dashboard/host/new_competition/AccessibilitySelector";
import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import { useRouter } from "next/navigation";

interface IAccessibility {
  type: string;
  [key: string]: string;
}

const NewCompetition = () => {


  const router = useRouter();

  const { organizationMembershipsToken, organizationMemberships } =
    useContext(DashBoardContext);

  const [associatedOrganizations, setAssociatedOrganizations] =
    useState<TAssociatedOrganizations>([]);
  useEffect(() => {
    if (!organizationMemberships) return;
    const associatedOrganizationIds = organizationMemberships?.map(
      (membership) => membership.organization_id
    );
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/organization_member/give_associated_organizations`;
    const data = { associatedOrganizationIds, organizationMembershipsToken };

    axios
      .post(url, data)
      .then((response) => {
        const data = response.data;
        setAssociatedOrganizations(data.associatedOrganizations);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  }, [organizationMemberships]);

  const organizationOptions = associatedOrganizations.map((organization) => ({
    value: organization.organization_id,
    label: organization.organization_name,
  }));
  const defaultOrganizationOption = organizationOptions[0];
  const remainingOrganizationOptions = organizationOptions.slice(1);

  const selectedOrganizationRef = useRef(defaultOrganizationOption?.value);
  const updateSelectedOrganization = (newValue: string) => {
    selectedOrganizationRef.current = newValue;
  };

  const selectedAccessibilityRef = useRef<IAccessibility>();
  const updateSelectedAccessibility = (newValue: IAccessibility) => {
    selectedAccessibilityRef.current = newValue;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.set("organization_id", selectedOrganizationRef.current);
    formData.append(
      "accessibility",
      JSON.stringify(selectedAccessibilityRef.current)
    );
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/organization_member/submit_new_competition`;
    formData.append(
      "organizationMembershipsToken",
      organizationMembershipsToken as string
    );
    try {
      const response = await axios.post(url, formData);
      if(response.data = 'competition_submitted') {
        alert('successfully submitted');
        setInterval(() => {
          router.push('/dashboard/host')
        },1000)
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
          onSubmit={handleSubmit}
          className="bg-white flex flex-col p-2 gap-2"
        >
          {/* regular expressions to be */}
          <TextInput
            name="competition_title"
            label="Competition Title"
            type="text"
          />
          <SelectionInput
            label="Organization"
            defaultOption={defaultOrganizationOption}
            options={remainingOrganizationOptions}
            valueSynchronizer={updateSelectedOrganization}
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
          <input
            type="file"
            name="application_form"
            accept=".pdf"
            size={10485760}
          />
          {/* can be arrange to work with google forms */}
          <SubmitButton specificStyles="self-center">Submit</SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default NewCompetition;
