import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

export function ProtectedRoute({ children, path }) {
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

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};
