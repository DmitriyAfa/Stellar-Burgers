import { useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
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
// import { ProvideAuth } from "../../services/auth";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { CLOSE_MODAL } from "../../services/actions/burger-ingredients";
import { getIngredients } from "../../services/actions/burger-ingredients";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const currentIngredient = useSelector(
    (state) => state.burgerIngredients.currentIngredient
  );

  const history = useHistory();
  const location = useLocation();

  let background = location.state && location.state.background;

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
    history.push(background);
  };
  console.log(background);
  return (
    <>
      <Switch location={background || location}>
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
          {/* <IngredientPage /> */}
          <IngredientDetails />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {background && (
        <Route path={`/ingredients/:id`} exact>
          <Modal header={"Детали ингредиента"} onClose={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;
