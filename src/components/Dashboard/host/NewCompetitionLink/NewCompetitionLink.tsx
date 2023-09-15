import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import Link from "next/link";
import React from "react";

const NewCompetitionLink = () => {
  return (
    <div className="justify-self-center flex flex-col justify-center bg-white rounded-md h-fit pt-1 pb-4 px-2">
      <h2 className="text-2xl font-semibold mb-4">Start a competition</h2>
      <p className="mb-4">
        You should be a admin or a excecutive to start a new competition
      </p>
      <Link href={"/dashboard/host/new_competition"}>
        <SubmitButton specificStyles="rounded-md">New competition</SubmitButton>
      </Link>
    </div>
  );
};

export default NewCompetitionLink;
