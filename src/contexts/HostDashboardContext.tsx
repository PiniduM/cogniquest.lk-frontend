"use client";

import axios, { AxiosInstance } from "axios";
import {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
  useContext,
  SetStateAction,
} from "react";
import { TGiveOrganizationMemberToken } from "../types/reqBodies";
import { AuthContext } from "./AuthContext";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface IContextValue {
  organizationMembershipsToken?: string;
  setOrganizationMembershipsToken: React.Dispatch<React.SetStateAction<string>>;
  customizedAxiosInstance: AxiosInstance;
}

export const HostDashBoardContext = createContext<IContextValue>({
  setOrganizationMembershipsToken: (() => {}) as React.Dispatch<
    SetStateAction<string>
  >,
  customizedAxiosInstance: axios.create(),
});

const HostDashboardContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();

  const { loginToken, userData } = useContext(AuthContext);

  const [organizationMembershipsToken, setOrganizationMembershipsToken] =
    useState<string>(getCookie("organization_memberships_token") || "");

  useEffect(() => {
    if (userData?.account_type === "candidate") {
      router.push("/login");
    }
    if (!organizationMembershipsToken) {
      const setupOrganizationToken = async () => {
        const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/organization_member/give_organization_memberships_token`;
        const data: TGiveOrganizationMemberToken = {
          loginToken: loginToken as string,
        };
        try {
          const response = await axios.post(url, data);
          const { organizationMembershipsToken } = response.data;
          setOrganizationMembershipsToken(organizationMembershipsToken);
          setCookie(
            "organization_memberships_token",
            organizationMembershipsToken,
            { maxAge: 1 * 60 * 60 }
          );
        } catch (error) {
          console.log(error);
          alert("Something went wrong");
        }
      };

      setupOrganizationToken();
    }
  }, []);
  const giveCustomizedAxiosInstance = (
    organizationMembershipsToken: string
  ) => {
    const config = {
      baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
      headers: {
        authorization: `Bearer ${organizationMembershipsToken}`,
      },
    };
    return axios.create(config);
  };
  const customizedAxiosInstance = organizationMembershipsToken
    ? giveCustomizedAxiosInstance(organizationMembershipsToken)
    : undefined; // Set as undefined initially

  const contextValue = {
    organizationMembershipsToken,
    setOrganizationMembershipsToken,
    customizedAxiosInstance,
  };

  return (
    <HostDashBoardContext.Provider value={contextValue}>
      {children}
    </HostDashBoardContext.Provider>
  );
};

export default HostDashboardContextProvider;
