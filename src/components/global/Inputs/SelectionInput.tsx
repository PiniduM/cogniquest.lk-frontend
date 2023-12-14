import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";

interface Iprops {
  options: { value: string; label: string }[];
  valueSynchronizer: (value: string) => void;
  label: string;
  defaultOption?: { value: string; label: string }; //don't include in the options Array - can impliment a filter but expensive
  required?: boolean;
}

const SelectionInput: React.FC<Iprops> = ({
  options,
  valueSynchronizer,
  label,
  defaultOption,
  required,
}) => {
  useEffect(() => {
    defaultOption && valueSynchronizer(defaultOption.value);
  }, [defaultOption, valueSynchronizer]);
  return (
    <div className="w-full">
      {/* <label className="flex flex-col">
        <span className="text-lg font-semibold mb-1">{label}</span>
        <select
          required={required}
          onChange={(e) => valueSynchronizer(e.target.value)}
          className="border-2 border-[var(--lightBlue)] p-1"
        >
          {defaultOption && (
            <option value={defaultOption.value}>{defaultOption.label}</option>
          )}
          {options.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </label> */}

      <FormControl fullWidth>
        <InputLabel id="select_contry-label">{label}</InputLabel>
        <Select
          required={required}
          labelId="select_contry-label"
          id="select_contry"
          value={defaultOption ? defaultOption.value : ""}
          label={label}
          onChange={(e) => valueSynchronizer(e.target.value)}
        >
          {options.map(({ value, label }) => (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectionInput;
