"use client";
import { setCookie } from "cookies-next";
import logoImage from "@/public/images/logo.png";
import ConfirmedPasswordInput from "@/src/components/global/Inputs/ConfirmedPasswordInput";
import SelectionInput from "@/src/components/global/Inputs/SelectionInput";
import CustomInput from "@/src/components/global/Inputs/CustomInput";
import Image from "next/image";
import { countriesOptions } from "@/src/staticValues/inputOptions";
import Link from "next/link";
import { useRef, useState, useEffect, useContext } from "react";
import {
  phoneNumberRegex,
  emailRegex,
  fullNameRegex,
  passwordRegex,
  usernameRegex,
} from "@/src/validators/validators";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import { AuthContext } from "@/src/contexts/AuthContext";

interface IPasswordStatus {
  password: string;
  confirmed: boolean;
}
interface INewStatus {
  password?: string;
  confirmed?: boolean;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [duplicateUsername, setDuplicateUsername] = useState(false);
  const [duplicateContactNumber, setDuplicateContactNumber] = useState(false);

  const selectedCountryRef = useRef<string>("");
  const passwordStatusRef = useRef<IPasswordStatus>({
    password: "",
    confirmed: false,
  });
  const updateSelectedCountry = (newValue: string) => {
    selectedCountryRef.current = newValue;
  };
  const updatePasswordStatus = (newStatus: INewStatus) => {
    Object.assign(passwordStatusRef.current, newStatus);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    form.blur();

    const email = form.email.value;
    const username = form.username.value;
    const fullName = form.full_name.value;
    const contactNumber = form.contact_number.value;
    const country = selectedCountryRef.current;
    const password = passwordStatusRef.current.password;

    //move statuses 1 level up to display custom messages for empty input submissions;
    if (
      !(
        emailRegex.test(email) &&
        usernameRegex.test(username) &&
        fullNameRegex.test(fullName) &&
        phoneNumberRegex.test(contactNumber) &&
        passwordRegex.test(password) &&
        passwordStatusRef.current.confirmed
      )
    )
      return false;
    const data = {
      email,
      username,
      password,
      contactNumber,
      fullName,
      country,
    };
    setDuplicateEmail(false);
    setDuplicateUsername(false);
    setDuplicateContactNumber(false);

    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/authentication/register_user`;
    try {
      const response = (await axios.post(url, data)) as AxiosResponse;
      const { emailVerificationToken } = response.data;
      if (emailVerificationToken) {
        setCookie("email_verification_token", emailVerificationToken, {
          maxAge: 1 * 60 * 60,
        });
        router.push("/verify_email");
      } else {
        alert("unknown error has occured. please try again.");
        setTimeout(() => router.refresh(), 3000);
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.data === "duplicate_email") setDuplicateEmail(true);
      else if (error.response?.data === "duplicate_username")
        setDuplicateUsername(true);
      else if (error.response?.data === "duplicate_contact_number")
        setDuplicateContactNumber(true);
      else alert("unknown error has occured. please try again.");
    }
  };

  const { loginToken } = useContext(AuthContext);
  useEffect(() => {
    if (loginToken) router.push("/");
  }, []);

  return (
    <div className="max-w-[90%] m-auto mt-[10vh] pb-4 grid grid-rows-[repeat(3,auto)] border-2 border-[var(--lightBlue)]">
      <div className="flex flex-col items-center bg-[var(--blue)]">
        <div className="h-[3.5rem] w-[3.5rem] rounded-full bg-white translate-y-[-12px] border-4 border-[var(--blue)]">
          <Image src={logoImage} alt="cogniquest" fill className="p-2" />
        </div>
        <h1 className="text-center text-white text-4xl font-semibold translate-y-[-10px]">
          Register
        </h1>
      </div>
      <div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="grid justify-items-center gap-6 pt-4 pb-6 max-w-[22rem] px-2 m-auto"
        >
          <CustomInput
            name="email"
            label="Email"
            type="text"
            required={true}
            validator={emailRegex}
            validationError="Please enter a valid email address"
            customError={
              <p className="text-red-600">
                Already regitered with this email. Login please
              </p>
            }
            displayCustomError={duplicateEmail}
          />
          <CustomInput
            name="username"
            label="Username"
            required={true}
            type="text"
            validator={usernameRegex}
            validationError="please enter a Username containing 6-12 characters including only numbers and letters"
            customError={
              <p className="text-red-600">Username is already taken</p>
            }
            displayCustomError={duplicateUsername}
          />
          <CustomInput
            name="full_name"
            label="Full name"
            type="text"
            required={true}
            validator={fullNameRegex}
            validationError="Please enter a valid full name containing at least first name and second name. Eg: John Doe"
          />
          <CustomInput
            name="contact_number"
            label="Phone number"
            type="text"
            required={true}
            validator={phoneNumberRegex}
            validationError="Please enter a valid phone number. Sri lankan phone number is required"
            customError={
              <p className="text-red-600">
                Already regitered with this phone number. Login please
              </p>
            }
            displayCustomError={duplicateContactNumber}
          />
          {/* covert regex to global - could not found a straFightforward criteria*/}
          <SelectionInput
            label="Country"
            defaultOption={{ value: "Sri Lanka", label: "Sri Lanka" }}
            options={countriesOptions.map((country) => ({
              value: country,
              label: country,
            }))}
            valueSynchronizer={updateSelectedCountry}
          />
          <ConfirmedPasswordInput
            statusSynchronizer={updatePasswordStatus}
            validator={passwordRegex}
            validationError="Plese enter a valid password containing 6-12 characters including only numbers and letters"
          />
          <SubmitButton>Register</SubmitButton>
        </form>
      </div>
      <div>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-[var(--blue)] underline font-semibold">
              Log in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
