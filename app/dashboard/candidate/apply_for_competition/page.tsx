import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const ApplyForCompetitionPage = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const competitioon_id = searchParams.get("competition_id");
  if(!competitioon_id) {
    router.push('/dashboard/candidate');
    return null;
  }

  useEffect(() => {
    

  },[])

  return (
    <div>

    </div>
  )
}

export default ApplyForCompetitionPage