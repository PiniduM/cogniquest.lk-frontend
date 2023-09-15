import React, { PropsWithChildren } from "react";

interface IProps {
  title: string;
}

const CompetitionListLayout: React.FC<PropsWithChildren & IProps> = ({
  children,
  title,
}) => {
  return (
    <div className=" px-3 py-1 bg-white rounded-lg max-w-[40rem] min-h-[20rem]">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
};

export default CompetitionListLayout;
