"use client";

import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

import logoImage from "@/public/images/logo.png";
import CustomInput from "@/src/components/global/Inputs/CustomInput";
import Link from "next/link";
import { emailRegex, passwordRegex } from "@/src/validators/validators";
import { useRouter, useSearchParams } from "next/navigation";
import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import ErrorPara from "@/src/components/global/errors/ErrorPara";
import { setCookie } from "cookies-next";
import { AuthContext } from "@/src/contexts/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const { setLoginToken } = useContext(AuthContext);

  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/authentication/login`;
    const data = { email, password };
    try {
      const response = await axios.post(url, data);
      const responseData = response.data as {
        loginToken?: string;
        emailVerificationToken?: string;
      };
      const { loginToken, emailVerificationToken } = responseData;
      if (loginToken) {
        setLoginToken(loginToken);
        setCookie("login_token", loginToken, { maxAge: 1 * 24 * 60 * 60 });
        router.push("/");
      } else {
        setCookie("email_verification_token", emailVerificationToken, {
          maxAge: 1 * 60 * 60,
        });
        router.push(`/verify_email`);
      }
    } catch (error) {
      console.log((error as AxiosError).response?.data);
      const response = (error as AxiosError).response;
      if (response?.data === "incorrect_credentials")
        setIncorrectCredentials(true);
      else {
        alert("Someting went wrong");
        setTimeout(() => router.refresh(), 3000);
      }
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
          Log in
        </h1>
      </div>
      <div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="grid justify-items-center gap-4 pt-4 pb-6 max-w-[22rem] px-2 m-auto"
        >
          <CustomInput
            name="email"
            label="Email"
            type="text"
            required={true}
            defaultValue={email || undefined}
            validator={emailRegex}
            validationError="Invalid email"
          />
          <CustomInput
            name="password"
            label="Password"
            type="password"
            required={true}
            validator={passwordRegex}
            validationError="Invalid password"
          />
          {incorrectCredentials && (
            <ErrorPara>Incorrect username or password</ErrorPara>
          )}
          <SubmitButton>Login</SubmitButton>
        </form>
      </div>
      <div>
        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/register">
            <span className="text-[var(--blue)] underline font-semibold">
              register
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
