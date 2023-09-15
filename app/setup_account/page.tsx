import FormLayout from "@/src/layouts/FormLayout";
import Link from "next/link";
import { ReactNode } from "react";

interface Iprops {
  children: ReactNode
  link: string
}

const MenuItem:React.FC<Iprops> = ({children,link}) => {
  return (
    <Link href={link} >
      <div className="min-w-[20rem] flex flex-col items-center justify-center py-4 px-2 bg-[var(--blue)] text-white text-2xl font-semibold">
        {children}
      </div>
    </Link>
  )
}


const SetupAccountPage = () => {
  return (
    <div className="p-2 pb-6">
      <h2 className="text-xl font-semibold mb-3">
        Your registration process is successfully completed.
        <br />
        Please go through the following setup to configure your account.
      </h2>

      <p className="text-[var(--subText)]">
        Unlike in conventional competition hosting patforms you can both
        participate competitions as a candidate and host competitions as a host
        using a single cogniquest account.
      </p>
      <p className="text-lg font-semibold">Please select the type the profile you want to cofigure</p>
      <p className="text-[var(--subText)] mb-4">
        if you want to configure both profiles,
        <span>select the most compulsory profile now. You can configure the other one later.</span>
      </p>
      <div className="grid grid-rows-[1fr,1fr] justify-center gap-4">
          <MenuItem link="/setup_account/candidate">
            Candiate
          </MenuItem>
          <MenuItem link="/setup_account/host">
            <p>host</p>
            <p className="text-sm text-gray-200">additional verifications required</p>
          </MenuItem>

      </div>
    </div>
  );
};

export default SetupAccountPage;
