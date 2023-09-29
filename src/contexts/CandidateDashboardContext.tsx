'use client'

import { getCookie, setCookie } from "cookies-next";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import axios, { AxiosDefaults, AxiosError, AxiosInstance } from "axios";
import { useRouter } from "next/navigation";

interface IContextValue {
  candidateToken?: string;
  setCandidateToken: React.Dispatch<React.SetStateAction<string>>;
  customizedAxiosInstance?: AxiosInstance;
}

export const CandidateDashboardContext: React.Context<IContextValue> =
  createContext({
    setCandidateToken: (() => {}) as React.Dispatch<
      React.SetStateAction<string>
    >,
  });

const CandidateDashboardContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();

  const { loginToken } = useContext(AuthContext);

  const [candidateToken, setCandidateToken] = useState(
    getCookie("candidate_token") || ""
  );
  useEffect(() => {
    if (!candidateToken) {
      const setupCandidateToken = async () => {
        const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/candidate/give_candidate_token`;
        const data = { loginToken };
        try {
          const response = await axios.post(url, data);
          const { candidateToken } = response.data;
          setCandidateToken(candidateToken);
          setCookie("candidate_token", candidateToken);
        } catch (err) {
          const error = err as AxiosError;
          const data = error.response?.data;
          if (data === "no_candidate_account") {
            router.push("/setup_account/candidate");
          } else {
            console.log(error);
            alert(data || "somthing went wrong");
          }
        }
      };
      setupCandidateToken();
    }
  }, [loginToken]);

  const giveCustomizedAxiosInstance = (candidateToken: string) => {
    const config = {
      baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
      headers: {
        authorization: `Bearer ${candidateToken}`,
      },
    };
    return axios.create(config);
  };

  const customizedAxiosInstance = candidateToken
    ? giveCustomizedAxiosInstance(candidateToken)
    : undefined;

  const contextValue = {
    candidateToken,
    setCandidateToken,
    customizedAxiosInstance,
  };
  return (
    <CandidateDashboardContext.Provider value={contextValue}>
      {children}
    </CandidateDashboardContext.Provider>
  );
};

export default CandidateDashboardContextProvider;
