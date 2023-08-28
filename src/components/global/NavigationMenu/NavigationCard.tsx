import React from "react";

interface Iprops {
  children: string;
}

const NavigationCard: React.FC<Iprops> = ({ children }) => {
  return (
    <div className="w-[20rem] h-[10rem] flex items-center justify-center bg-[#65CED4]">
      <p className="text-4xl font-semibold">{children}</p>
    </div>
  );
};

export default NavigationCard;
