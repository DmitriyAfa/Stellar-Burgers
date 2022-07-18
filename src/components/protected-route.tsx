import { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useActions } from "../utils/useAction";
import { useTypedSelector } from "../utils/useTypedSelector";

export const ProtectedRoute = ({ path, exact, children }: RouteProps) =>  {
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
      render={({ location }): any =>
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