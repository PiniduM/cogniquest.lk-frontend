import React, { PropsWithChildren } from "react";

const ErrorPara: React.FC<PropsWithChildren> = ({ children }) => {
  return <p className="text-red-700">{children}</p>;
};

export default ErrorPara;
