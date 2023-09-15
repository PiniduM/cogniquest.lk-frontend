"use client";
import { useState } from "react";

interface Iprops {
  name: string;
  label: string;
  type: string;
  value?: string;
  specificStyles?: string;
  required?: true;
  defaultValue?: string;
  validator?: RegExp;
  validationError?: string;
  customError?: React.ReactNode;
  displayCustomError?: boolean;
  valueSynchronizer?: (value: string) => void;
}

const CustomInput: React.FC<Iprops> = ({
  name,
  label,
  type,
  value,
  required,
  defaultValue,
  specificStyles,
  validator,
  validationError,
  customError,
  displayCustomError,
  valueSynchronizer,
}) => {
  const [valid, setValid] = useState(true);
  const validate = (value: string) => {
    setValid((validator as RegExp).test(value));
  };
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const input = e.target;
    validator && validate(input.value || "");
    valueSynchronizer && valueSynchronizer(input.value);
  };

  return (
    <div className="w-full">
      <label className="flex flex-col">
        <span className="text-lg font-semibold mb-1">{label}</span>
        <input
          name={name}
          type={type}
          required={required}
          value={value}
          defaultValue={defaultValue}
          onBlur={handleBlur}
          className={`p-1 border-2 border-[var(--lightBlue)] ${specificStyles}`}
        />
      </label>
      {!valid && <p className="text-red-700">{validationError}</p>}
      {displayCustomError && <div className="text-red-700">{customError}</div>}
    </div>
  );
};

export default CustomInput;
