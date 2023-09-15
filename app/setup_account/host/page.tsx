"use client";

import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import SelectionInput from "@/src/components/global/Inputs/SelectionInput";
import CustomInput from "@/src/components/global/Inputs/CustomInput";
import { AuthContext } from "@/src/contexts/AuthContext";
import { TSetupHostingStaffAccountReqBody } from "@/src/types/reqBodies";
import { validRoles } from "@/src/validators/validators";
import axios from "axios";
import Link from "next/link";
import { useRef, useContext } from "react";

const AccountSetupHostPage: React.FC = () => {
  const { loginToken } = useContext(AuthContext);

  const selectedRoleRef = useRef("");
  const updateSelectedRole = (value: string) => {
    selectedRoleRef.current = value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const form = e.target as HTMLFormElement;

    const referenceCode = form.reference_code;
    const role = selectedRoleRef.current;

    const url = ``;
    const data: TSetupHostingStaffAccountReqBody = {
      hostingStaffAccountSetupData: { referenceCode, role },
      loginToken: loginToken as string,
    };
    try {
      const response = await axios.post(url, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2 pb-8">
      <h1 className="text-xl font-semibold mb-2">
        Please provide following data to setup your cogniquest host account
      </h1>
      <p className="mb-4">
        Please enter the reference code of the organization you are registering
        for
      </p>
      <form 
      onSubmit={handleSubmit}
      className="max-w-[22rem] m-auto mb-4">
        <CustomInput
          name="reference_code"
          type="text"
          label="Organization's reference code"
        />
        <SelectionInput
          label="Role"
          options={validRoles.map((role) => ({ label: role, value: role }))}
          valueSynchronizer={updateSelectedRole}
        />
        <SubmitButton>Set up</SubmitButton>
      </form>
      <p className="">
        &#x2022; If you haven't registered your organization{" "}
        <Link href="/setup_account/host/register_organization">
          <span className="text-[var(--blue)] font-semibold">
            click here to register your organization.
          </span>
        </Link>
      </p>
    </div>
  );
};

export default AccountSetupHostPage;
