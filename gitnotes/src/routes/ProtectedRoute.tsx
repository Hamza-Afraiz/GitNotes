import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserState } from "../hooks";

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useUserState();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
