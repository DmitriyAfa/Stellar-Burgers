import { useEffect } from "react";
import styles from "./ingridient-details.module.css";
import { useSelector } from "react-redux";
import {useParams } from "react-router-dom";
import {IIngredient} from '../../utils/types/ingredient.types';
import { TStateBurgerIngredients } from "../../services/reducers/burger-ingredients";
import { useTypedSelector } from "../../utils/useTypedSelector";

function IngredientDetails() {

  const params = useParams<{id?: string}>();
  const ingredients = useTypedSelector(
    (state: any) => state.burgerIngredients.ingredients
  );

  let ingredient = {
    id: "",
    image: "",
    name: "",
    calories: "",
    fat: "",
    carbohydrates: "",
    proteins: ""
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
