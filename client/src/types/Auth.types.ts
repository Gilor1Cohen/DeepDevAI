import type { Dispatch, SetStateAction } from "react";

export interface AuthRes {
  userID: number;
  userName: string;
  email: string;
}

export interface TokenRes {
  token: string;
}

export interface JwtPayload {
  email: string;
  userID: number;
  userName: string;
  iat: number;
  exp: number;
}

export interface AuthPageProps {
  setAuth: Dispatch<SetStateAction<boolean>>;
}
