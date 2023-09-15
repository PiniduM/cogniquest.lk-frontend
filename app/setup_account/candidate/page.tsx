"use client";

import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import SelectionInput from "@/src/components/global/Inputs/SelectionInput";
import CustomInput from "@/src/components/global/Inputs/CustomInput";
import { validOccupations } from "@/src/validators/validators";
import React, { useRef } from "react";

const AccountSetupCandidatePage: React.FC = () => {

    const occupationRef = useRef('');
    const updateOccupation = (value:string) => {
        occupationRef.current = value;
    }

    const handleSubmit = async (e:React.FormEvent) =>  {
        const form = e.target as HTMLFormElement;

        const birthdate = form.birthdate?.value
        const occupation = occupationRef.current

        //fetch
    }

  return (
    <div className="p-2 pb-8">
      <h1 className="text-xl font-semibold">
        Please provide following data to setup your cogniquest candidate account
      </h1>
      <form className="max-w-[22rem] m-auto flex flex-col items-center gap-4 " onSubmit={(e) => handleSubmit(e)}>
        <CustomInput name="date" type="date" label="Bithdate" />
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
