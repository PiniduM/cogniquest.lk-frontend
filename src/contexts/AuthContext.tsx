"use client";

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
  setLoginToken: (token: string) => void;
  loginToken?: string;
  userData?: TUserData
}

export const AuthContext: Context<IcontextValues> = createContext({
  setLoginToken: (token: string) => {},
});

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const token = getCookie("login_token");
  const userData = token ? jwtDecode(token) : undefined;
  const [loginToken, setLoginToken] = useState(userData ? token : undefined);
  //To prevent setting a malformed token as the login token
  const contextValue = { loginToken, setLoginToken, userData } as IcontextValues;
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
