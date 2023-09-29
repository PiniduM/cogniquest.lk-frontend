import React, { PropsWithChildren } from "react";

interface IProps {
  onClick?: () => {};
  type?: "submit" | "reset";
  className?: string;
}

const DefaultButton: React.FC<PropsWithChildren & IProps> = ({
  children,
  onClick,
  type,
  className,
}) => {
  return (
    <button
      className={`py-2 px-4 text-white bg-[var(--btnBg)] ${className}`}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
