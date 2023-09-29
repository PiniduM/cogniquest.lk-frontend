import React from "react";

interface IProps {
  participationStatusResetFunction: () => void;
}

const PostSubmissionSection:React.FC<IProps> = ({}) => {
  return (
    <div className="flex justify-center align-middle">
      <p className="text-xl font-semibold text-gray-600">
        Proeject submitted successfully
      </p>
    </div>
  );
};

export default PostSubmissionSection;
