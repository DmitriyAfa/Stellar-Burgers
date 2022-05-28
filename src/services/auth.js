import { useContext, useState, createContext } from "react";
// import { deleteCookie, setCookie } from "./utils";
import React from "react";
// import { loginRequest, getUserRequest, logoutRequest } from "./api";

import { authUser, refreshTokenFunc, logout } from "./actions/profile";
import { loginRequest } from "./actions/login";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const data = await authUser(accessToken).then((data) => data);
    if (data) {
      setUser({ ...data.user });
    }
    // else {
    //   const refreshToken = localStorage.getItem("refreshToken");
    //   const refreshData = await refreshTokenFunc(refreshToken);
    //   if (refreshData.success) {
    //     localStorage.setItem("accessToken", refreshData.accessToken);
    //     localStorage.setItem("refreshToken", refreshData.refreshToken);
    //     getUser();
    //   }
    // }

    return data;
  };

  const signin = async (form) => {
    const data = await loginRequest(form).then((data) => data);

    if (data.success) {
      setUser({ ...data });
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    return data.success;
  };

  const signOut = async (refreshToken) => {
    logout(refreshToken);
    setUser(null);
    localStorage.setItem("accessToken", null);
    localStorage.setItem("refreshToken", null);
  };

  return {
    user,
    getUser,
    signin,
    signOut,
  };
}
