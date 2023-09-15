'use client'

import LoginWindow from "@/src/components/management/LoginWindow";
import ManagementWindow from "@/src/components/management/ManagementWindow";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const Managementpage = () => {
  const [managementToken, setManagementToken] = useState("");

  useEffect(() => {
    const storedManagementToken = getCookie("management_token");
    if (storedManagementToken) setManagementToken(storedManagementToken);
  }, []);

  return (
    <section>
      {managementToken ? (
        <ManagementWindow ManagementToken={managementToken} />
      ) : (
        <LoginWindow setManagementToken={setManagementToken} />
      )}
    </section>
  );
};

export default Managementpage;
