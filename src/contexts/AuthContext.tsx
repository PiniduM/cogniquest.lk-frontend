"use client";

import React from "react";

import { getCookie } from "cookies-next";
import jwtDecode, { JwtPayload } from "jwt-decode";
import {
  PropsWithChildren,
  useEffect,
  useState,
  createContext,
  Context,
  Dispatch,
  SetStateAction,
} from "react";
import { TUserData } from "../types/application";
import { useRouter } from "next/navigation";
import axios, { AxiosInstance } from "axios";

export interface IcontextValues {
  setLoginToken: React.Dispatch<SetStateAction<string | undefined>>;
  loginToken?: string;
  userData?: TUserData;
  customizedAxiosInstance?: AxiosInstance;
}

export const AuthContext: Context<IcontextValues> = createContext({
  setLoginToken: (() => {}) as React.Dispatch<
    SetStateAction<string | undefined>
  >,
});

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  let token = undefined;
  // let userData = undefined as TUserData | undefined;
  const [loginToken, setLoginToken] = useState(undefined);
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    token = getCookie("login_token");
    const userDataTmp = token ? jwtDecode(token) : undefined;
    console.log(userDataTmp);
    setUserData(userDataTmp);
    if (userDataTmp) {
      //To prevent setting a malformed token as the login token
      setLoginToken(token);
      // alert(userDataTmp.account_type);
      if (
        userDataTmp &&
        typeof userDataTmp === "object" &&
        "account_type" in userDataTmp &&
        userDataTmp.account_type === null
      ) {
        router.push("/setup_account");
      }
    }
  }, []);

  const giveCustomizedAxiosInstance = (loginToken: string) => {
    const config = {
      baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
      headers: {
        authorization: `Bearer ${loginToken}`,
      },
    };
    return axios.create(config);
  };
  const customizedAxiosInstance = loginToken
    ? giveCustomizedAxiosInstance(loginToken)
    : undefined;
  const contextValue = {
    loginToken,
    setLoginToken,
    userData,
    customizedAxiosInstance,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
