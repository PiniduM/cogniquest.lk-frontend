import SubHeading from "@/src/components/global/Headings/SubHeading";
import { IMembershipWaitingForApproval } from "@/src/types/application";
import axios, { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import MembershipWaitingForApproval from "./MembershipWaitingForApproval";
import CardListLayout from "@/src/layouts/CardListLayout";
import { HostDashBoardContext } from "@/src/contexts/HostDashboardContext";

interface IProps {
  organizationId: string;
}

const MembershipsWaitingForApproval: React.FC<IProps> = ({
  organizationId,
}) => {
  const { organizationMembershipsToken, customizedAxiosInstance } =
    useContext(HostDashBoardContext);

  const [membershipsWaitingForApproval, setMembershipsWaitingForApproval] =
    useState<IMembershipWaitingForApproval[]>([]);

  const setupMembershipsWaitingForApproval = useCallback(async () => {
    const url = `organization/admin/give_memberships_waiting_for_approval`;
    const data = { organizationId };

    try {
      const response = await customizedAxiosInstance.post(url, data);
      const result = response.data;
      const { membershipsWaitingForApproval } = result;
      setMembershipsWaitingForApproval(membershipsWaitingForApproval);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      alert(error.response?.data || "something went wrong");
    }
  }, [organizationId, organizationMembershipsToken]);

  useEffect(() => {
    if (organizationMembershipsToken) {
      setupMembershipsWaitingForApproval();
    }
  }, [organizationMembershipsToken]);

  return (
    <CardListLayout title="Memberships Waiting for admin's Approval">
      {membershipsWaitingForApproval.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {membershipsWaitingForApproval.map((membership) => (
            <MembershipWaitingForApproval
              organizationId={organizationId}
              membership={membership}
              adminsMembershipsToken={organizationMembershipsToken as string}
              refresher={setupMembershipsWaitingForApproval}
            />
          ))}
        </ul>
      ) : (
        <p className="font-semibold text-center">no memberships</p>
      )}
    </CardListLayout>
  );
};

export default MembershipsWaitingForApproval;
