"use client";

import axios from "axios";
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
import {
  IOrganizationMembershipsPayload,
  TParsedMembershipsArray,
} from "../types/application";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";

interface IContextValue {
  organizationMembershipsToken?: string;
  setOrganizationMembershipsToken: React.Dispatch<React.SetStateAction<string>>;
  // organizationMemberships: TParsedMembershipsArray;
}

export const DashBoardContext = createContext<IContextValue>({
  setOrganizationMembershipsToken: (() => {}) as React.Dispatch<
    SetStateAction<string>
  >,
});

const HostDashboardContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();

  const { loginToken, userData } = useContext(AuthContext);

  const [organizationMembershipsToken, setOrganizationMembershipsToken] =
    useState<string>(getCookie("organization_memberships_token") || "");

  //sets value initially so that if cookie is present use effects ast child will effect imediately.
  //if cookie is absent they will effect after state change in .self's use effect.
  //if doing conditional rendering at childrent based on management token initiallize token using a useState hook and update it in a useEffect hook

  // const orgMembershipsTokenDecryped = (organizationMembershipsToken &&
  //   jwtDecode(organizationMembershipsToken)) as
  //   | IOrganizationMembershipsPayload
  //   | undefined;

  // const organizationMemberships = (orgMembershipsTokenDecryped &&
  //   JSON.parse(orgMembershipsTokenDecryped.memberships)) as
  //   | TParsedMembershipsArray
  //   | undefined;
  useEffect(() => {
    // const organizationMembershipsToken = getCookie("organization_memberships_token")
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
  const contextValue = {
    organizationMembershipsToken,
    setOrganizationMembershipsToken,
  };

  return (
    <DashBoardContext.Provider value={contextValue}>
      {children}
    </DashBoardContext.Provider>
  );
};

export default HostDashboardContextProvider;
