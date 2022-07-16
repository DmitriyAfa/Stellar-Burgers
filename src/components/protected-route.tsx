import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../utils/useAction";
import { useTypedSelector } from "../utils/useTypedSelector";

export function ProtectedRoute({ children, path, exact }: {children: React.ReactNode, path: string, exact: boolean}) {
  const { getUser } = useActions();
  const {isLoggedIn} = useTypedSelector(
    (state) => state.user
  );

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Route
      path={path}
      exact={exact}
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