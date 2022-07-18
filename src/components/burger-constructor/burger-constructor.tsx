import styles from "./burger-constructor.module.css";
import Buns from "./parts/buns";
import Order from "./parts/order";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useSelector } from "react-redux";
import { useActions } from "../../utils/useAction";
import { TStateBurgerIngredients } from "../../services/reducers/burger-ingredients";


function BurgerConstructor() {
  const modalIsActive = useSelector(
    (state: {burgerIngredients: TStateBurgerIngredients}) => state.burgerIngredients.orderDetailsIsActive
  );
  
  const {closeModalOfOrderDetails, clearOrderDetails} = useActions();
  
  const onClose = () => {
    closeModalOfOrderDetails();
    clearOrderDetails()
  };
  return (
    <>
      <section className={styles.burgerConstructor}>
        <Buns />
        <Order />
      </section>
      {modalIsActive && (
        <Modal header={false} onClose={onClose} isFeed={null}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
