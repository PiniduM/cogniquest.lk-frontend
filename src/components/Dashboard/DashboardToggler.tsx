import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const DashBoardTypeToggler: React.FC = () => {
  const router = useRouter();

  const pathname = usePathname();

  const currentType = pathname.split('/')[1] as 'host' | 'candidate' || 'host'

  const [dashBoardType, setDashBoardType] = useState<"host" | "candidate">(
    currentType
  );

  const updateDashboardType = (newType: "host" | "candidate") => {
    router.push(`/dashboard/${newType}`);
    setDashBoardType(newType);
  };
  return (
    <div className=" relative grid grid-cols-[1fr,1fr] border-2 border-[var(--blue)] rounded-full bg-white cursor-default">
      <div
        className={`absolute w-[50%] h-full bg-[var(--blue)] rounded-full ${
          dashBoardType === "candidate" && "translate-x-[101%]"
        }`}
      ></div>
      <div
        onClick={
          dashBoardType !== "host"
            ? () => updateDashboardType("host")
            : undefined
        }
        className={`relative z-2 text-center font-semibold p-1 ${
          dashBoardType === "host" && "text-white"
        }`}
      >
        Host
      </div>
      <div
        className={`relative z-2 text-center font-semibold p-1 ${
          dashBoardType === "candidate" && "text-white"
        } `}
        onClick={
          dashBoardType !== "candidate"
            ? () => updateDashboardType("candidate")
            : undefined
        }
      >
        Candidate
      </div>
    </div>
  );
};

export default DashBoardTypeToggler;