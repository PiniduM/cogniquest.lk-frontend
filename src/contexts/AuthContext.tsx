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

interface IcontextValues {
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

  const token = getCookie("login_token");
  const userData = (token ? jwtDecode(token) : undefined) as
    | TUserData
    | undefined;
  const [loginToken, setLoginToken] = useState(userData ? token : undefined);
  //To prevent setting a malformed token as the login token

  useEffect(() => {
    if (userData && userData?.account_type === null) {
      router.push("/setup_account");
    }
  }, [loginToken]);

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
