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
    <div className="max-w-[40rem] pb-2 m-auto mt-[10vh] border-2 border-[var(--lightBlue)]">
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
