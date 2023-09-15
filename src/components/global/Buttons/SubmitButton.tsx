import { PropsWithChildren } from "react";

interface Iprops {
  specificStyles?: string;
}

const SubmitButton = ({
  specificStyles,
  children,
}: Iprops & PropsWithChildren) => {
  return (
    <button
      type="submit"
      className={`py-2 px-10 bg-[var(--blue)] text-white font-semibold ${specificStyles}`}
    >
      {children}
    </button>
  );
};
export default SubmitButton;
