import Image from "next/image";
import logoImage from "@/public/images/logo.png";
import { PropsWithChildren, ReactNode } from "react";

interface Iprops {
  title: string | ReactNode;
}

const FormLayout: React.FC<PropsWithChildren & Iprops> = ({
  title,
  children,
}) => {
  return (
    <div className="md:max-w-[100%] max-w-full sm:max-w-[95%] m-auto pt-[8rem] lg:pt-[5rem] pb-4 grid grid-rows-[repeat(3,auto)] min-h-screen">
      <div className="flex flex-col items-center bg-[var(--blue)]">
        <div className="h-[3.5rem] w-[3.5rem] rounded-full bg-white translate-y-[-12px] border-4 border-[var(--blue)]">
          <Image src={logoImage} alt="cogniquest" fill className="p-2" />
        </div>
        <h1 className="text-center text-white text-4xl font-semibold translate-y-[-10px]">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
};

export default FormLayout;
