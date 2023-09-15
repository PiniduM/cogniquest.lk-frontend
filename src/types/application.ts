import { JwtPayload } from "jwt-decode";

export type TUserData = JwtPayload & {
  email: string;
  user_id: string;
  username: string;
  account_type: string;
};

export interface IOrganizationMembershipsPayload {
  user_id: string;
  memberships: string;
  [key: string]: string;
}

export type TParsedMembershipsArray =  {
  member_id: string;
  role: string;
  organization_id: string;
  admin_approved: "N" | "Y";
  system_verified: "Y" | "Y";
}[]

export type TAssociatedOrganizations = {
  organization_id: string; // number but treated as a string
  organization_name: string;
}[]