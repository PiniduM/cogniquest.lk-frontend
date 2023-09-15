"use client";
import jwtDecode from "jwt-decode";
import {getCookie} from "cookies-next"
import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import { verificationCodeRegex } from "@/src/validators/validators";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import logoImage from "@/public/images/logo.png";
import { useEffect, useState } from "react";

const VerifyEmailPage: React.FC = () => {
  const [invalidVerificationCode, setInvalidVerificationCode] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();
  const emailVerificationToken = getCookie('email_verification_token');
  useEffect(() => {
    if (!emailVerificationToken) {
      router.push("/login");
      return;
    }
    try {
      const decodedToken = jwtDecode(emailVerificationToken) as {
        [key: string]: string;
      };
      const email = decodedToken?.email;
      if (email) setEmail(email);
      else {
        router.push("/login");
      }
    } catch {
      router.push("/login");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const verificationCode = form.verification_code.value;
    if (!verificationCodeRegex.test(verificationCode)) {
      setInvalidVerificationCode(true);
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/authentication/verify_email`;
    const data = { emailVerificationToken, verificationCode };
    try {
      const response = await axios.post(url, data);
      if (response.data === "verified") router.push(`/login?email=${email}`);
    } catch (error) {
      const response = (error as AxiosError).response;
      if (response?.data === "invalid_credentials")
        setInvalidVerificationCode(true);
    }
  };
  
  return email ? (
    <div className="max-w-[40rem] m-auto mt-[10vh] border-2 border-[var(--lightBlue)]">
      <div className="flex flex-col items-center bg-[var(--blue)]">
        <div className="h-[3.5rem] w-[3.5rem] rounded-full bg-white translate-y-[-12px] border-4 border-[var(--blue)]">
          <Image src={logoImage} alt="cogniquest" fill className="p-2" />
        </div>
        <h1 className="text-center text-white text-4xl font-semibold translate-y-[-10px]">
          Verify Your Email
        </h1>
      </div>
      <div className="p-4">
        <p className="w-[30rem] m-auto text-center mb-4">
          A email including a six digit verification code has sent to
          <br />
          your email address{" "}
          <span className="text-[var(--blue)]">{email}</span>
          .
          <br />
          <span className="font-semibold">
            Please enter that code to verify your email address.
          </span>
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center max-w-[22rem] m-auto"
        >
          <input
            name="verification_code"
            type="text"
            className="p-1 border-2 border-[var(--lightBlue)] mb-2 text-center text-2xl font-semibold tracking-[2px]"
          />
          {invalidVerificationCode && (
            <p className="text-red-700 mb-4">Invalid verification code</p>
          )}
          <SubmitButton>Verify</SubmitButton>
        </form>
      </div>
    </div>
  ) : null;
};

export default VerifyEmailPage;
