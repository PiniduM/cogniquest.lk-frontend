"use client";

import { useState, useRef } from "react";

interface Iprops {
  updateDataHandler: (key: string, value: string) => void;
  submitDataHandler: () => void;
}

const HostRegistrationForm: React.FC<{}> = () => {
  const dataRef = useRef<{ [key: string]: string }>({});
  const updateData = (key: string, value: string) => {
    dataRef.current[key] = value;
  };
  const submitData = () => {
    // fetch
  };

  const [slideNo, setSlideNo] = useState();

  return <div>slides</div>;
};

export default HostRegistrationForm;
