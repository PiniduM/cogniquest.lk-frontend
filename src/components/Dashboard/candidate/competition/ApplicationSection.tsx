import DefaultButton from "@/src/components/global/Buttons/DefaultButton";
import { CandidateDashboardContext } from "@/src/contexts/CandidateDashboardContext";
import axios, { AxiosError, AxiosInstance } from "axios";
import { useContext } from "react";

interface IProps {
  competitionId: string;
  participationStatusResetFunction: () => void;
}

const ApplicationSection: React.FC<IProps> = ({ competitionId,participationStatusResetFunction }) => {
  const { customizedAxiosInstance } = useContext(CandidateDashboardContext);

  const applyForCompetition = async () => {
    const url = `/candidate/apply_for_competition`;
    const data = { competitionId };
    try {
      await (customizedAxiosInstance as AxiosInstance).post(
        url,
        data
      );
      participationStatusResetFunction();
      alert(
        "successefully applied You will be abale to submit your project when hosts approve your application"
      );
    } catch (err) {
      const error = err as AxiosError;
      alert(error.response?.data || "something wend wrong");
    }
  };
  return (
    <section className="mt-4">
      <p className="text-gray-800 font-semibold mb-2">Click below button to apply for the competition.</p>
      <p className="text-red-500 font-semibold mb-2">Your account informations will be shared with the organization.</p>
      <DefaultButton onClick={applyForCompetition} className="px-6 py-2 text-lg hover:text-xl font-semibold">Apply</DefaultButton>
    </section>
  );
};

export default ApplicationSection;
