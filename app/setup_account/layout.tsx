'use client'

import { AuthContext } from "@/src/contexts/AuthContext"
import FormLayout from "@/src/layouts/FormLayout"
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useContext, useEffect } from "react"

const AccountSetupLayout:React.FC<PropsWithChildren> = ({children}) => {

  const router = useRouter();
  const {loginToken} = useContext(AuthContext);
  
  useEffect(() => {
    if(!loginToken) router.push('/login');
  },[])
  return (
    <FormLayout title="Welcome to Cogniquest.lk">
        {children}
    </FormLayout>
  )
}

export default AccountSetupLayout