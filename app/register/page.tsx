"use client";

import logoImage from "@/public/images/logo.png";
import CandidateRegistrationForm from "@/src/components/registerPage/CandidateRegistrationForm";
import HostRegistrationForm from "@/src/components/registerPage/HostRegistrationForm";
import Image from "next/image";

import Link from "next/link";
import { useRef, useState } from "react";

const RegisterPage: React.FC = () => {
  const [type, setType] = useState<undefined | "candidate" | "host">(undefined);

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
        {type === undefined ? (
          <h1> select a type</h1>
        ) : type === "candidate" ? (
          <CandidateRegistrationForm />
        ) : (
          <HostRegistrationForm />
        )}
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
