'use client'

import Image from "next/image";
import React from "react";

import logoImage from "@/public/images/logo.png";
import TextInput from "@/src/components/global/Inputs/TextInput";
import Link from "next/link";

const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  alert(form.email.value);
};

const LoginPage = () => {
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
          className="grid justify-items-center gap-6 pt-4 pb-6 max-w-[22rem] px-2 m-auto"
        >
          <TextInput name="email" lable="Email" type="text" />
          <TextInput name="password" lable="Password" type="password" />
          <button type="submit" className="py-2 px-10 bg-[var(--blue)]">
            Login
          </button>
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
