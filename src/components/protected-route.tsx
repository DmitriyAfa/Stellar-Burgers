import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../utils/useAction";

export function ProtectedRoute({ children, path }: {children: React.ReactNode, path: string}) {
  const { getUser } = useActions();
  const isLoggedIn = useSelector(
    (state: any) => state.user.isLoggedIn
  );
  const getUserFunc = async () => {
    const res: any = await getUser();
    console.log(res);
  };

  useEffect(() => {
    getUserFunc();
  }, []);
  return (
    <Route
      path={path}
      exact
      render={({ location }) =>
      isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location,
              },
            }}
          />
        )
      }
    />
  );
}