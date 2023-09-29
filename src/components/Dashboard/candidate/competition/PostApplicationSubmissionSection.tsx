import React from "react";

interface IProps {
  participationStatusResetFunction: () => void;
}

const PostApplicationSubmissionSection:React.FC<IProps> = ({}) => {
  return (
    <section className="">
      <h3 className="text-lg font-semibold">
        Your application is successfully submitted and waiting for hosts
        approval.
      </h3>
    </section>
  );
};

export default PostApplicationSubmissionSection;
