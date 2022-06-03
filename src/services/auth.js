import { useContext, useState, createContext } from "react";

import { authUser, refreshTokenFunc, logout } from "./actions/profile";

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

    return data;
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
    signOut,
  };
}
