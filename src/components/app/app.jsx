import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BurgerPage from "../../pages/burger/burger";
import LoginPage from "../../pages/login/login";
import RegistrationPage from "../../pages/registration/registration";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import IngredientPage from "../../pages/ingredient/ingredient";
import { NotFound404 } from "../../pages/not-found/not-found";
import { ProtectedRoute } from "../protected-route";
import { ProvideAuth } from "../../services/auth";

function App() {
  const currentIngredient = useSelector(
    (state) => state.burgerIngredients.currentIngredient
  );

  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/" exact>
            <BurgerPage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegistrationPage />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" exact>
            <ResetPassword />
          </Route>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route path={`/ingredients/:${currentIngredient._id}`} exact>
            <IngredientPage />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
