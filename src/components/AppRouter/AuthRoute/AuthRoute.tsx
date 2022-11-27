import React from "react";

import { Navigate, useLocation } from "react-router-dom";

import { useSelector, shallowEqual } from "react-redux";

// Types
import { ILocationType, IReduxStore } from "./../../../services/types/";

// Helpers
import { getLocalStorageWithExpiry } from "./../../../services/utils/helpers/workWithLocalStorage";

interface IAuthRouteComponent {
  outlet: React.ReactElement;
}

export const AuthRoute: React.FunctionComponent<IAuthRouteComponent> =
  React.memo(({ outlet }) => {
    const location = useLocation() as ILocationType;

    const user = useSelector((store: IReduxStore) => store.user, shallowEqual);
    const accessToken =
      user.data.accessToken || getLocalStorageWithExpiry("accessToken");

    const from = location.state?.from?.pathname || "/";

    if (accessToken)
      return (
        <Navigate
          to={{ pathname: from }}
          state={{ from: { pathname: location.pathname } }}
        />
      );

    return outlet;
  });
