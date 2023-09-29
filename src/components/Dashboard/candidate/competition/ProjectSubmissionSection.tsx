import SubmitButton from "@/src/components/global/Buttons/SubmitButton";
import { CandidateDashboardContext } from "@/src/contexts/CandidateDashboardContext";
import uploadProjectFile from "@/src/utils/upload/uploadProjectFile";
import axios, { AxiosInstance } from "axios";
import React, { useContext, useRef } from "react";

interface IProps {
  applicationId : string
  participationStatusResetFunction: () => void;
}

const ProjectSubmissionSection: React.FC<IProps> = ({ applicationId,participationStatusResetFunction }) => {
  const { customizedAxiosInstance } = useContext(CandidateDashboardContext);

  const handleProjectSubmission: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const projectFile = form.project_file?.files[0];

    if (!projectFile) {
      alert("plase select the project file");
      return;
    }

    const url = `/candidate/submit_project`;
    const data = { applicationId };

    try {
      const response = await (customizedAxiosInstance as AxiosInstance).post(
        url,
        data
      );
      const { projectFileUploadToken } = response.data;
      if (projectFileUploadToken) {
        try {
          await uploadProjectFile(projectFileUploadToken, projectFile);
          participationStatusResetFunction();
          alert("Project submitted successfully");
        } catch (error) {
          console.log(error);
          alert(error); // handle and update UI accordingly
        }
      } else {
        alert("submission failed");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <section>
      <h1 className="text-lg font-semibold">
        Select your project file and Click submit to submit your project
      </h1>
      <p className="text-[var(--subtext)]">
        {" "}
        Currently you can't update project files after submission so make sure
        that your project files are completed
      </p>
      <form onSubmit={handleProjectSubmission}>
        <label className="flex flex-col">
          <span className="text-lg font-semibold mb-2">Project File :</span>
          <input
            name="project_file"
            type="file"
            accept=".zip,.rar,.7zip"
            className="px-2 py-4 border-2 border-[var(--inputBorder)] bg-white mb-4"
          />
        </label>
        <SubmitButton>Submit</SubmitButton>
      </form>
    </section>
  );
};

export default ProjectSubmissionSection;
