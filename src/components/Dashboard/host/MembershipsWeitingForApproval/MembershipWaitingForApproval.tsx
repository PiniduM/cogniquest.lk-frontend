import DefaultButton from "@/src/components/global/Buttons/DefaultButton";
import { IMembershipWaitingForApproval } from "@/src/types/application";
import axios, { AxiosError } from "axios";

interface IProps {
  organizationId: string;
  membership: IMembershipWaitingForApproval;
  adminsMembershipsToken: string;
  refresher: () => void;
}

const MembershipWaitingForApproval = ({
  organizationId,
  membership,
  adminsMembershipsToken,
  refresher,
}: IProps) => {
  const { member_id, username, full_name, email, role } = membership;
  const handleApproval = async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/organization_member/admin/approve_membership`;
    const data = {
      organizationId,
      member_id,
      organizationMembershipsToken: adminsMembershipsToken,
    };

    try {
      const response = await axios.post(url, data);
      const result = response.data;
      alert(result || "membershp approved");
      refresher();
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      alert(error.response?.data || "something went wrong");
    }
  };

  return (
    <li>
      <div className="grid grid-cols-[1fr,auto] py-2 px-4 bg-[var(--extraLightBg)]">
        <p className="font-semibold text-lg">Username : {username}</p>
        <p className="text-end font-semibold">Member ID : {member_id}</p>
        <p className="">Full name : {full_name}</p>
        <p className="col-start-1">Email Address : {email}</p>
        <p className="col-start-1">Role : {role}</p>
        <DefaultButton onClick={handleApproval}>Approve</DefaultButton>
      </div>
    </li>
  );
};

export default MembershipWaitingForApproval;
