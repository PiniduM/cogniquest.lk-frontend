"use client";
import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import CustomInput from "@/src/components/global/Inputs/CustomInput";
import { AuthContext } from "@/src/contexts/AuthContext";
import {
  TOrganizationRegistrationData,
  TRegisterOrganizationReqBody,
} from "@/src/types/reqBodies";
import validateOrgRegistrationData from "@/src/utils/register_organization/validateOrgRegistrationData";
import {
  phoneNumberRegex,
  emailRegex,
  organizationNameRegex,
  addressRegex,
  referencePrefixRegex,
} from "@/src/validators/validators";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ReactNode, useContext, useRef, useState } from "react";

// const OrganizationDataCollectorSlide: React.FC = () => {
//   return <div>org data</div>;
// };
// const AdminDataCollectorSlide: React.FC = () => {
//   return <div>admin data</div>;
// };

interface IOrganizationDataRef {
  organization_name?: string;
  contact_number?: string;
  email?: string;
  address?: string;
  forProfit?: string;
}

// interface IAdminDataRef {
//   role?: string;
// }

const RegisterOrganizationPage = () => {
  // const organizationDataRef = useRef<IOrganizationDataRef>({});
  // const adminDataRef = useRef<IAdminDataRef>({});
  //const [slideNumber, setSlideNumber] = useState<1 | 2>(1) not required because there is only one piece of data (role) should be taken about the admin.impliment if required in future.

  const { loginToken } = useContext(AuthContext);

  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [duplicateOrganizationName, setDuplicateOrganizationName] =
    useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const organizationName = form.organization_name?.value;
    const email = form.email?.value;
    const phoneNumber = form.phone_number?.value;
    const address = form.address?.value;
    const organizationType = form.organization_type?.value;
    const referencePrefix = form.reference_prefix?.value;

    const orgRegistrationData = {
      organizationName,
      email,
      phoneNumber,
      address,
      organizationType,
      referencePrefix,
    };
    if (!validateOrgRegistrationData(orgRegistrationData)) return;
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/authentication/register_organization`;
    const data: TRegisterOrganizationReqBody = {
      loginToken: loginToken as string,
      orgRegistrationData,
    };
    setDuplicateEmail(false);
    setDuplicateOrganizationName(false);
    try {
      const response = (await axios.post(url, data)) as AxiosResponse;
      if (response.data === "organization_registered") {
        //to admin dashbord
        
        alert("ok");
      } else {
        alert("something went wrong please try again!");
        delayedReload(5000);
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.data === "duplicate_email") setDuplicateEmail(true);
      else if (error.response?.data === "duplicate_organization_name")
        setDuplicateOrganizationName(true);
      else {
        alert("something went wrong please try again later");
        delayedReload(5000);
      }
      console.log(error);
    }
  };

  return (
    <div className="p-2 pb-8">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Register your organization
      </h1>

      <h2 className="text-lg font-semibold">Important !</h2>
      <div className="flex flex-col gap-1 mb-4">
        <li>
          The user that register an organization is considered as the admin of
          that organization &#x28;If necessary that user can transfer the
          authority later.&#x29;.
        </li>
        <li>
          You must be an executive of a organization to register that
          organization
        </li>
        <li>
          If you are not a executive of the organization you are working for
          please ask an executive to register the organization and send you the
          reference code.
        </li>
        <li>
          The registration request will be reviewed manually and we will contact
          the organization through provided methods to verify the registration.
        </li>
      </div>
      <h2 className="text-lg font-semibold mb-2">
        Please provide following data to register your organization
      </h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-6 max-w-[22rem] ml-4"
      >
        <CustomInput
          name="organization_name"
          type="text"
          label="Name of the organization"
          required={true}
          validator={organizationNameRegex}
          validationError="Please enter a valid organization name containing 2 - 100"
          //highly versatile
          displayCustomError={duplicateOrganizationName}
          customError="An organization is already registered with this name.
          If this is not a misatake please contact the cogniquest management for further inquires."
        />
        <CustomInput
          name="email"
          type="text"
          label="Email Address of the organization"
          validator={emailRegex}
          validationError="Please eneter a valid email address"
          displayCustomError={duplicateEmail}
          customError="An organizations is already registered with this email address. 
          If this is  not a misatake Please Contact the cogniquest management for further inquires."
        />
        <CustomInput
          name="phone_number"
          type="text"
          label="Phone Number of the organization"
          validator={phoneNumberRegex}
          validationError="Please enter a valid Sri lankan phone number"
        />
        <CustomInput
          name="address"
          type="text"
          label="Main Address of the organization"
          validator={addressRegex}
          validationError="Please enter a valid address containing 4 - 100 characters"
        />
        <CustomInput
          name="reference_prefix"
          type="text"
          label="Reference prefix(This + 4 random numbers will be the reference code of the organization)"
          validator={referencePrefixRegex}
          validationError="Reference prefix must contain exactly 4 Uppercase letters"
        />
        <div>
          <p className="text-xl font-semibold mb-2">Type of the organization</p>
          <div className="flex gap-16">
            <label className="flex items-center gap-4">
              <input
                type="radio"
                name="organization_type"
                required
                value="for_profit"
              />
              <span>For profit</span>
            </label>
            <label className="flex items-center gap-4">
              <input type="radio" name="organization_type" value="non_profit" />
              <span>Non profit</span>
            </label>
          </div>
        </div>
        <SubmitButton>Register</SubmitButton>
      </form>
    </div>
  );
};

export default RegisterOrganizationPage;
