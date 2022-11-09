import { useEffect } from "react";
import { Switch, Route, useHistory, useLocation, useRouteMatch } from "react-router-dom";
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
import { useActions } from "../../utils/useAction";
import AppHeader from "../app-header/app-header";
import FeedPage from "../../pages/feed/feed";
import { useTypedSelector } from "../../utils/useTypedSelector";
import { FeedDetails } from "../feed-details/feed-details";
import { ProfileForm } from "../profile-form/profileForm";
import { ProfileOrder } from "../profile-order/profileOrder";

function App() {
  const history = useHistory();
  const location = useLocation<{background: Location}>();
  const {feedDetails} = useTypedSelector((state) => state.feed)
  const { getIngredientsRequest, closeModal, getUser } = useActions();

  const isFeedPage = useRouteMatch('/feed');
  const isProfileOrdersPage = useRouteMatch('/profile/orders');
  const isFeed = isFeedPage || isProfileOrdersPage;

  // Воспроизводим метод жизненного цикла componentDidMount 
  //При первом монтировании компонента отправим запросы на сервер
  //Получим ингредиенты и залогинен ли user
  useEffect(() => {
    getIngredientsRequest();
    getUser();
  }, []);

  let background: any = location.state && location.state.background;
  //ILocationStateBackground | undefined

  const closeModalIngredient = () => {
    closeModal();
    history.push(background);
  };
  const closeModalFeed= () => {
    closeModal();
    history.push('/feed');
  };
  const closeModalProfile = () => {
    closeModal();
    history.push('/profile/orders');
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
        <ProtectedRoute exact  path="/profile">
          <ProfilePage text={`В этом разделе вы можете изменить свои персональные данные`} >
            <ProfileForm />
          </ProfilePage>
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders">
          <ProfilePage text={`В этом разделе вы можете просмотреть свою историю заказов`} >
            <ProfileOrder />
          </ProfilePage>
        </ProtectedRoute>
        <Route path={`/ingredients/:id`} exact>
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
        <Route exact path="/feed">
          <FeedPage />
        </Route>
        <Route exact  path="/feed/:id">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "120px",
            }}
          >
            <FeedDetails />
          </div>
        </Route>
        <Route exact  path="/profile/orders/:id">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "120px",
            }}
          >
            <FeedDetails />
          </div>
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {background && (
        <>
        <Route path={`/ingredients/:id`}>
          <Modal header={"Детали ингредиента"} onClose={closeModalIngredient} isFeed={isFeed}>
            <IngredientDetails />
          </Modal>
        </Route>
        <Route exact path="/feed/:id">
          <Modal header={feedDetails ? feedDetails.number : ''} onClose={closeModalFeed} isFeed={isFeed}>
            <FeedDetails />
          </Modal>
        </Route>
        <Route exact path="/profile/orders/:id">
          <Modal header={feedDetails ? feedDetails.number : ''} onClose={closeModalProfile} isFeed={isFeed}>
            <FeedDetails />
          </Modal>
        </Route>
        </>
      )}
    </>
  );
}

export default App;
