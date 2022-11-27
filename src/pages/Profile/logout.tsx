import React from "react";

import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { logoutEnhance } from "./../../services/redux/enhances/";

export const Logout = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(logoutEnhance() as any);

    navigate("/login");
  }, [dispatch, navigate]);

  return null;
});
