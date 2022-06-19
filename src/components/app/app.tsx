import { useEffect, useCallback } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BurgerPage from "../../pages/burger/burger";
import LoginPage from "../../pages/login/login";
import RegistrationPage from "../../pages/registration/registration";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import { NotFound404 } from "../../pages/not-found/not-found";
import { ProtectedRoute } from "../protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { CLOSE_MODAL } from "../../services/actions/burger-ingredients";
import { useActions } from "../../utils/useAction";
import AppHeader from "../app-header/app-header";
function App() {
  const dispatch = useDispatch();
  const { getIngredientsRequest } = useActions();

  const getIngredients = useCallback(async () => {
    return await getIngredientsRequest();
  }, [dispatch]);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  const currentIngredient = useSelector(
    (state: any) => state.burgerIngredients.currentIngredient
  );


  const history = useHistory();
  const location = useLocation<{background: Location}>();

  let background: any = location.state && location.state.background;
  //ILocationStateBackground | undefined

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
    history.push(background);
  };
  // console.log(history);
  return (
    <>
      <AppHeader constr="active" lenta="" profile="" />
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
          <AppHeader constr="" lenta="" profile="" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "120px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h2 className="text text_type_main-large">Детали ингредиента</h2>
              <IngredientDetails />
            </div>
          </div>
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {background && (
        <Route path={`/ingredients/:id`}>
          <Modal header={"Детали ингредиента"} onClose={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;
