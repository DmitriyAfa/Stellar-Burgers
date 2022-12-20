import React from "react";

// Router
import { Routes, Route, useLocation } from "react-router-dom";

// components
import App from "../App/App";

// pages
import {
  Home,
  Feed,
  Login,
  Registration,
  ForgotPassword,
  ResetPassword,
} from "../../pages";
import IngredientDetails from "../Modals/IngredientDetails/IngredientDetails";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import ProfileContent from "../ProfileContent/ProfileContent";
import { AuthRoute } from "./AuthRoute/AuthRoute";
import Modal from "../Modals/Modal";

export const AppRouter: React.FunctionComponent = React.memo(() => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />

          <Route path="ingredients/:id" element={<IngredientDetails />} />

          <Route
            path="profile/*"
            element={<ProtectedRoute outlet={<ProfileContent />} />}
          />
          <Route path="feed" element={<Feed />} />

          <Route path="login" element={<AuthRoute outlet={<Login />} />} />
          <Route
            path="register"
            element={<AuthRoute outlet={<Registration />} />}
          />
          <Route
            path="forgot-password"
            element={<AuthRoute outlet={<ForgotPassword />} />}
          />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal>
                <IngredientDetails />{" "}
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
});
