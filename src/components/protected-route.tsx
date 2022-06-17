import { Redirect, Route } from "react-router-dom";

export function ProtectedRoute({ children, path }: {children: React.ReactNode, path: string}) {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <Route
      path={path}
      exact
      render={({ location }) =>
        accessToken ? (
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