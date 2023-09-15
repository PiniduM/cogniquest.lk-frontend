"use client";

import { useState, useRef } from "react";

interface ISlide0Props {
  updateDataHandler: (key: string, value: string) => void;
}

const slide0:React.FC<ISlide0Props> = (updateHandler) => {
  return (
    <section>
      <h1>slide 1</h1>
    </section>
  )
};

interface Iprops {
  updateDataHandler: (key: string, value: string) => void;
  submitDataHandler: () => void;
}

const CandidateRegistrationForm: React.FC<{}> = () => {
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

export default CandidateRegistrationForm;
