import ScrollBurgerConstructor from "./scroll-burger-consctructor";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { useActions } from "../../../utils/useAction";
import { IIngr} from '../../../utils/types/ingredient.types';
import { useTypedSelector } from "../../../utils/useTypedSelector";

function Buns() {
  const bun = useTypedSelector((state) => state.burgerIngredients.bun);
  const {addBun, makeBunQtyZero, increase, getBunId, getId, getPrice  } = useActions();

  const [, drop] = useDrop({
    accept: "ingredient",
    drop(ingredient: IIngr) {
      if (ingredient.ingredient.type === "bun") {
        addBun(ingredient);
        makeBunQtyZero();
        increase(ingredient.ingredient._id);
        increase(ingredient.ingredient._id);
        getBunId();
        getId();
        getPrice();
      }
    },
  });
  
  return (
    <ul ref={drop} className="mt-25 ml-4">
      <li className="ml-8 mb-4">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх) `}
          price={bun.price}
          thumbnail={bun.image}
        />
      </li>
      <li>
        <ScrollBurgerConstructor />
      </li>
      <li className="ml-8 mt-4">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ) `}
          price={bun.price}
          thumbnail={bun.image}
        />
      </li>
    </ul>
  );
}

export default Buns;
