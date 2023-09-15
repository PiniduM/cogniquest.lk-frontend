import axios from "axios";
import {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { TGiveOrganizationMemberToken } from "../types/reqBodies";
import { AuthContext } from "./AuthContext";
import { getCookie, setCookie } from "cookies-next";
import {
  IOrganizationMembershipsPayload,
  TParsedMembershipsArray,
} from "../types/application";
import jwtDecode from "jwt-decode";

interface IContextValue {
  organizationMembershipsToken?: string;
  setOrganizationMembershipsToken?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  organizationMemberships?: TParsedMembershipsArray;
}

export const DashBoardContext = createContext<IContextValue>({});

const DashboardContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { loginToken, userData } = useContext(AuthContext);

  const [organizationMembershipsToken, setOrganizationMembershipsToken] =
    useState<string | undefined>(getCookie("organization_memberships_token"));

  const orgMembershipsTokenDecryped = (organizationMembershipsToken &&
    jwtDecode(organizationMembershipsToken)) as
    | IOrganizationMembershipsPayload
    | undefined;

  const organizationMemberships = (orgMembershipsTokenDecryped &&
    JSON.parse(orgMembershipsTokenDecryped.memberships)) as
    | TParsedMembershipsArray
    | undefined;
  useEffect(() => {
    // const organizationMembershipsToken = getCookie("organization_memberships_token")
    if (
      !(userData?.account_type === "candidate" || organizationMembershipsToken)
    ) {
      const setupOrganizationToken = async () => {
        const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/organization_member/give_organization_memberships_token`;
        const data: TGiveOrganizationMemberToken = {
          loginToken: loginToken as string,
        };
        try {
          const response = await axios.post(url, data);
          const { organizationMembershipsToken } = response.data;
          if (organizationMembershipsToken) {
            setOrganizationMembershipsToken(organizationMembershipsToken);
            setCookie(
              "organization_memberships_token",
              organizationMembershipsToken,
              { maxAge: 1 * 60 * 60 }
            );
          } else alert("something went wrong");
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
    organizationMemberships,
  };

  return (
    <DashBoardContext.Provider value={contextValue}>
      {children}
    </DashBoardContext.Provider>
  );
};

export default DashboardContextProvider;
