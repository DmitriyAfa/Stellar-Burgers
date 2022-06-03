import { useSelector } from "react-redux";
import styles from "./ingredient.module.css";
import AppHeader from "../../components/app-header/app-header";

function IngredientPage() {
  // const ingredient = JSON.parse(sessionStorage.getItem("currentIngredient"));
  // console.log(ingredient);
  const ingredient = useSelector(
    (state) => state.burgerIngredients.currentIngredient
  );
  console.log(ingredient);
  return (
    <>
      <AppHeader constructor="active" lenta="" profile="" />
      <section className={`${styles.modal} ${styles.active}`}>
        <div className={styles.content}>
          <div className={`text text_type_main-large`}>Детали ингредиента</div>
          <div className={`mb-15 ${styles.main}`}>
            <img src={ingredient.image} alt={ingredient.name} />
            <h4 className="mt-2 text text_type_main-medium">
              {ingredient.name}
            </h4>
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
                <p className="text text_type_digits-default">
                  {ingredient.fat}
                </p>
              </li>
              <li className="ml-5">
                <p className="text text_type_main-default">Углеводы, г</p>
                <p className="text text_type_digits-default">
                  {ingredient.carbohydrates}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default IngredientPage;
