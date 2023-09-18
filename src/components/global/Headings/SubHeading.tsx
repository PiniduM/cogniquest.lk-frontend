import React, { PropsWithChildren } from "react";

interface Iprops {
  specificStyles?: string;
}

const SubHeading: React.FC<PropsWithChildren & Iprops> = ({
  children,
  specificStyles,
}) => {
  return (
    <h2 className={`text-2xl font-semibold mb-4 ${specificStyles || ''}`}>
      {children}
    </h2>
  );
};

export default SubHeading;
