
import styles from "./ingridient-details.module.css";
import {useParams } from "react-router-dom";
import {IIngredient} from '../../utils/types/ingredient.types';
import { useTypedSelector } from "../../utils/useTypedSelector";
import { TStore } from "../../utils/types/types";

function IngredientDetails() {

  const params = useParams<{id?: string}>();
  const ingredients = useTypedSelector(
    (state) => state.burgerIngredients.ingredients
  );

  let ingredient: IIngredient = {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: '',
    image_large: '',
    image_mobile: '',
    name: '',
    price: 0,
    proteins: 0,
    type: '',
    __v: 0,
    _id: '',
    id: '',
  };

  if (ingredients.length > 0) {
    const ingr = ingredients.find(
      (ingredient: {qty: number, ingredient: IIngredient}) => ingredient.ingredient._id === params.id
    );
    ingredient = ingr ? ingr.ingredient : ingredient;
  }

  return (
    <>
      <div className={`mb-15 ${styles.main}`}>
        <img src={ingredient.image} alt={ingredient.name} />
        <h4 className="mt-2 text text_type_main-medium">{ingredient.name}</h4>
        <ul className="mt-8">
          <li className="">
            <p className="text text_type_main-default">Калории,ккал</p>{" "}
            <p className="text text_type_digits-default">
              {ingredient.calories}
            </p>
          </li>
          <li className="ml-5">
            <p className="text text_type_main-default">Белки, г</p>{" "}
            <p className="text text_type_digits-default">
              {ingredient.proteins}
            </p>
          </li>
          <li className="ml-5">
            <p className="text text_type_main-default">Жиры, г</p>
            <p className="text text_type_digits-default">{ingredient.fat}</p>
          </li>
          <li className="ml-5">
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_digits-default">
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default IngredientDetails;
