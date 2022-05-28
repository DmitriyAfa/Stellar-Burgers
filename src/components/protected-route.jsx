import { useAuth } from "../services/auth";
import { Redirect, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { refreshTokenFunc } from "../services/actions/profile";

export function ProtectedRoute({ children, ...rest }) {
  let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    const data = await getUser();
    // console.log(data);
    // if (data === undefined) {
    //   const refreshToken = localStorage.getItem("refreshToken");
    //   const refreshData = await refreshTokenFunc(refreshToken);
    //   if (refreshData.success) {
    //     localStorage.setItem("accessToken", refreshData.accessToken);
    //     localStorage.setItem("refreshToken", refreshData.refreshToken);
    //     getUser();
    //   }
    // }
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
