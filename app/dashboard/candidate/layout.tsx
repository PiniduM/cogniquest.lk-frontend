import CandidateDashboardContextProvider from "@/src/contexts/CandidateDashboardContext";
import { PropsWithChildren } from "react";

const CandidateDashboardLayout: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <CandidateDashboardContextProvider>
      {children}
    </CandidateDashboardContextProvider>
  );
};

export default CandidateDashboardLayout;
