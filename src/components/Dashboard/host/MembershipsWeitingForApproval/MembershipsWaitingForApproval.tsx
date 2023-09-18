import SubHeading from "@/src/components/global/Headings/SubHeading";
import { IMembershipWaitingForApproval } from "@/src/types/application";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import MembershipWaitingForApproval from "./MembershipWaitingForApproval";

interface IProps {
  organizationMembershipsToken: string | undefined;
  organizationId: string;
}

const MembershipsWaitingForApproval: React.FC<IProps> = ({
  organizationMembershipsToken,
  organizationId,
}) => {
  const [membershipsWaitingForApproval, setMembershipsWaitingForApproval] = useState<
    IMembershipWaitingForApproval[]
  >([]);

  const setupMembershipsWaitingForApproval = useCallback(async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/organization_member/admin/give_memberships_waiting_for_approval`;
    const data = {organizationId, organizationMembershipsToken};

    try {
      const response = await axios.post(url, data);
      const result = response.data;
      const { membershipsWaitingForApproval } = result;
      setMembershipsWaitingForApproval(membershipsWaitingForApproval);
    } catch (err) {
      const error = err as AxiosError
      console.log(error);
      alert (error.response?.data || 'something went wrong')
    }
  }, [organizationId, organizationMembershipsToken]);

  useEffect(() => {
    if (organizationMembershipsToken) {
      setupMembershipsWaitingForApproval();
    }
  }, [organizationMembershipsToken]);

  return (
    <div>
      <SubHeading>Mambers waiting for admin's approval</SubHeading>
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
    </div>
  );
};

export default MembershipsWaitingForApproval;
