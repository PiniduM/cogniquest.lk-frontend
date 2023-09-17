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

interface IcontextValues {
  setLoginToken: React.Dispatch<SetStateAction<string | undefined>>;
  loginToken?: string;
  userData?: TUserData;
}

export const AuthContext: Context<IcontextValues> = createContext({
  setLoginToken: (() => {}) as React.Dispatch<
    SetStateAction<string | undefined>
  >,
});

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const token = getCookie("login_token");
  const userData = (token ? jwtDecode(token) : undefined) as
    | TUserData
    | undefined;
  const [loginToken, setLoginToken] = useState(userData ? token : undefined);
  //To prevent setting a malformed token as the login token
  const contextValue = { loginToken, setLoginToken, userData };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
