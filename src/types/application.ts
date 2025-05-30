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

export type TOrganizationMembershipsArray =  {
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

export interface IOrganizationData {
  organization_id: string;
  organization_name: string;
  reference_code: string;
}

export interface IMembershipWaitingForApproval {
  member_id: string;
  username: string;
  full_name: string;
  email: string;
  role: string;
}

export interface ICompetitionWaitingForApproval {
  competition_id: string;
  competition_title: string;
  accessibility: string;
  status: string;
  organization_name: string;
}