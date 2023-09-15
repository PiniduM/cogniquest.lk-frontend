import CustomInput from "@/src/components/global/Inputs/CustomInput";
import SelectionInput from "@/src/components/global/Inputs/SelectionInput";
import { validAccessibilities } from "@/src/validators/competitions";
import React, { useState, useRef, useEffect } from "react";

interface IProps {
  valueSynchronizer: (newValue: {
    type: string;
    [key: string]: string;
  }) => void;
}

const AccessibilitySelector: React.FC<IProps> = ({ valueSynchronizer }) => {
  const accessibilityOptions = validAccessibilities.map((accessibility) => ({
    value: accessibility,
    label: accessibility,
  }));
  
  const [selectedAccessibility, setSelectedAccessibility] = useState<string>('');
  const selectionHandler = (newValue: string) => {
    console.log(newValue)
    setSelectedAccessibility(newValue);
    valueSynchronizer({ type: selectedAccessibility });
  };
    const defaultAccessibilityOption = accessibilityOptions[0];
    const remainingAccessibilityOptions = accessibilityOptions.slice(1);

  const passcodeRef = useRef<string>("");
  const updatePasscode = (newValue: string) => {
    passcodeRef.current = newValue;
    valueSynchronizer({
      type: selectedAccessibility,
      passcode: newValue,
    });
  };
  const PasscodeInput = () => {
    return (
      <CustomInput
        label="Passcode"
        name="passcode"
        type="text"
        valueSynchronizer={updatePasscode}
      />
    );
  };

  useEffect(() => {
    valueSynchronizer({ type: selectedAccessibility });
  }, []);
  // const linkRef = useRef<string>("");
  // const updateLink = (newValue: string) => {
  //   linkRef.current = newValue
  // }
  // const updateRef = (ref: React.MutableRefObject<string>, newValue: string) => {
  //   ref.current = newValue;
  // };
  // const LinkInput = () => {
  //   return (
  //     <CustomInput
  //       label="Passcode"
  //       name="passcode"
  //       type="text"
  //       valueSynchronizer={updatePassword}
  //     />
  //   );
  // };
  //let to add a custom link with some limitations
  console.log(selectedAccessibility)
  return (
    <div>
      <SelectionInput
        label="Accessibility"
        options={remainingAccessibilityOptions}
        defaultOption={defaultAccessibilityOption}
        valueSynchronizer={selectionHandler}
      />
      {selectedAccessibility === "passcode_protected" && <PasscodeInput />}
    </div>
  );
};

export default AccessibilitySelector;
