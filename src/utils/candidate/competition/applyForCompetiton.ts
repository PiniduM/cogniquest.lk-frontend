import axios, { AxiosError } from "axios";

const applyForCompetition = async (
  competitionId: string,
  candidateToken: string
) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/organization_member/apply_for_competition`;
  const data = { competitionId, candidateToken };
  try {
    const response = await axios.post(url, data);
    alert(
      "successefully applied You will be abale to submit your project when hosts approve your application"
    );
  } catch (err) {
    const error = err as AxiosError;
    alert(error.response?.data || "something wend wrong");
  }
};

export default applyForCompetition;
