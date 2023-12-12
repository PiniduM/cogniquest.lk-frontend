import { TextField } from "@mui/material";
import { useRef, useState } from "react";
import { passwordRegex } from "@/src/validators/validators";

interface IPasswordStatus {
  password?: string;
  confirmed?: boolean;
}

interface Iprops {
  statusSynchronizer: ({}: IPasswordStatus) => void;
  validator: RegExp;
  validationError: string;
  fullWidth?: boolean;
}

const ConfirmedPasswordInput: React.FC<Iprops> = ({
  statusSynchronizer,
  validator,
  validationError,
  fullWidth,
}) => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmedPasswordRef = useRef<HTMLInputElement>(null);
  const [valid, setValid] = useState(true);
  const [confirmed, setConfirmed] = useState<boolean | undefined>(undefined);

  const validatePassword = (password: string, confirmedPassword: string) => {
    if (passwordRegex.test(password || "")) {
      setValid(true);
      statusSynchronizer({ password });
      if (confirmedPassword) {
        validateConfirmation(password, confirmedPassword);
      }
    } else {
      setValid(false);
      setConfirmed(false);
    }
  };
  const validateConfirmation = (
    password: string,
    confirmedPassword: string
  ) => {    
    if (password === confirmedPassword) {
      setConfirmed(true);
      statusSynchronizer({ confirmed: true });
    } else {
      setConfirmed(false);
      statusSynchronizer({ confirmed: false });
    }
  };

  return (
    <>
      <div className="w-full">
        <TextField
          fullWidth={fullWidth}
          label={"Password"}
          name="password"
          type="password"
          required={true}
          inputRef={passwordRef}
          onBlur={(e) =>
            validatePassword(
              passwordRef.current?.value || "", // Access value directly
              confirmedPasswordRef.current?.value || ""
            )
          }
          error={!valid}
          helperText={!valid && validationError}
        />
      </div>
      <div className="w-full">
        <TextField
          fullWidth={fullWidth}
          label={"Confirmed password"}
          name="confirmed_password"
          type="password"
          required={true}
          inputRef={confirmedPasswordRef}
          onBlur={(e) =>
            validateConfirmation(
              passwordRef.current?.value || "",
              confirmedPasswordRef.current?.value || ""
            )
          }
          error={confirmed === false}
          helperText={!confirmed && "Passwords do not match!"}
        />
      </div>
    </>
  );
};

export default ConfirmedPasswordInput;
