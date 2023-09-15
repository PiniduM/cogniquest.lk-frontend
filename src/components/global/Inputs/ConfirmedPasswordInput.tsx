import { passwordRegex } from "@/src/validators/validators";
import { useRef, useState } from "react";

interface IPasswordStatus {
  password?: string;
  confirmed?: boolean;
}

interface Iprops {
  statusSynchronizer: ({}: IPasswordStatus) => void;
  validator: RegExp;
  validationError: string;
}

const ConfirmedPasswordInput: React.FC<Iprops> = ({
  statusSynchronizer,
  validator,
  validationError,
}) => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmedPasswordRef = useRef<HTMLInputElement>(null);
  const [valid, setValid] = useState(true);
  const [confirmed, setConfirmed] = useState<boolean | undefined>(undefined);

  const validatePassword = (password: string, confirmedPassword: string) => {
    if (passwordRegex.test(password || "")) {
      setValid(true);
      if (confirmed !== undefined) {
        validateConfirmation(password, confirmedPassword);
      }
    } else setValid(false);
    statusSynchronizer({ password });
  };

  const validateConfirmation = (
    password: string,
    confirmedPassword: string
  ) => {
    if (password === confirmedPassword) setConfirmed(true);
    else setConfirmed(false);
    statusSynchronizer({
      confirmed: validator.test(password) && password === confirmedPassword,
    });
  };

  return (
    <>
      <div className="w-full">
        <label className="flex flex-col w-full">
          <span className="text-lg font-semibold mb-1">Password</span>
          <input
            name="password"
            type="password"
            required={true}
            ref={passwordRef}
            onBlur={(e) =>
              validatePassword(
                e.target.value,
                (confirmedPasswordRef.current as HTMLInputElement).value
              )
            }
            className="p-1 border-2 border-[var(--lightBlue)]"
          />
        </label>
        {!valid && <p className="text-red-700">{validationError}</p>}
      </div>
      <div className="w-full">
        <label className="flex flex-col w-full">
          <span className="text-lg font-semibold mb-1">Confirmed password</span>
          <input
            name="confirmed_password"
            type="password"
            required={true}
            ref={confirmedPasswordRef}
            onBlur={(e) =>
              validateConfirmation(
                (passwordRef.current as HTMLInputElement).value,
                e.target.value
              )
            }
            className="p-1 border-2 border-[var(--lightBlue)]"
          />
        </label>
        {confirmed === false && (
          <p className="text-red-700">Passwords do not match!</p>
        )}
      </div>
    </>
  );
};

export default ConfirmedPasswordInput;
