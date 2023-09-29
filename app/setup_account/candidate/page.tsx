"use client";

import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import SelectionInput from "@/src/components/global/Inputs/SelectionInput";
import CustomInput from "@/src/components/global/Inputs/CustomInput";
import { validOccupations } from "@/src/validators/validators";
import React, { useContext, useRef } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";

const AccountSetupCandidatePage: React.FC = () => {
  const router = useRouter();

  const { customizedAxiosInstance } = useContext(AuthContext);

  const occupationRef = useRef("");
  const updateOccupation = (value: string) => {
    occupationRef.current = value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const birthdate = form.birthdate?.value;
    const occupation = occupationRef.current;

    const url = `/authentication/setup_candidate_account`;
    const candidateAccountSetupData = { birthdate, occupation };
    try {
      await customizedAxiosInstance?.post(url, { candidateAccountSetupData });
      alert("successfully setupped");
      router.replace("/dashboard/candidate");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="p-2 pb-8">
      <h1 className="text-xl font-semibold">
        Please provide following data to setup your cogniquest candidate account
      </h1>
      <form
        className="max-w-[22rem] m-auto flex flex-col items-center gap-4 "
        onSubmit={(e) => handleSubmit(e)}
      >
        <CustomInput name="birthdate" type="date" label="Bithdate" />
        <SelectionInput
          options={validOccupations.map((occupation) => ({
            value: occupation,
            label: occupation,
          }))}
          label="Occupation"
          valueSynchronizer={updateOccupation}
        />
        <SubmitButton>Submit</SubmitButton>
      </form>
    </div>
  );
};

export default AccountSetupCandidatePage;
