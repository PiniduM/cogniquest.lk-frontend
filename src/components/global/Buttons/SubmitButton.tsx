import Button from "@/src/ui/button";
import { PropsWithChildren } from "react";

interface Iprops {
  specificStyles?: string;
}

const SubmitButton = ({
  specificStyles,
  children,
}: Iprops & PropsWithChildren) => {
  return (
    <Button
      type="submit"
      onClick={() => {}}
      className={`py-2 px-10 bg-[var(--blue)] text-white font-semibold ${specificStyles}`}
    >
      {children}
    </Button>
  );
};
export default SubmitButton;
