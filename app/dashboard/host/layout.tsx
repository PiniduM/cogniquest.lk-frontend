import HostDashboardContextProvider from "@/src/contexts/HostDashboardContext";
import { PropsWithChildren } from "react";

const HostDashboardLayout:React.FC<PropsWithChildren> = ({children}) => {

    return (
        <HostDashboardContextProvider>
        {children}
        </HostDashboardContextProvider>
    )
}

export default HostDashboardLayout;