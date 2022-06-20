import {IIngredient} from '../../utils/types/ingredient.types'
export interface IMakeDetail{
  ingredient: IIngredient;
  id: number;
  moveCard: Function;
  index: number;
}