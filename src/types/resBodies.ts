export interface IAssociatedCompetition {
  competition_id: string;
  competition_title: string;
  accessibility: string;
  status: string;
  organization_name: string;
}

export type TAssociatedCompetitions = IAssociatedCompetition[];

export interface ICompetitionWaitingForApproval {
  competition_id: string;
  competition_title: string;
  accessibility: string;
  status: string;
  organization_name: string;
}
export type TCompetitionsWaitingForApprovalREsponseData =
  ICompetitionWaitingForApproval[];

export interface ICompetition {
  accessibility: string;
  admin_approved: "Y" | "N";
  allowed_candidates: string | null;
  application_form_link: string;
  assest_type: string;
  competition_id: string;
  competition_link: string;
  competition_title: string;
  description: string;
  organization_id: string;
  passcode: string | null;
  status: string;
  system_approved:"Y" | "N";
}
export type TGiveCompetitionResponseData = {
  competition: ICompetition;
};

export interface IPubliclyAvailbeCompetitionCompetition {
  competition_id: string;
  competition_title: string;
  accessibility: string;
  status: string;
  organization_name: string;
}

export type TPubliclyAvailbleCompetitions = IPubliclyAvailbeCompetitionCompetition[];