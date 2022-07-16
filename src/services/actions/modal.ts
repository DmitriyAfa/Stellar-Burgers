import { Store } from "redux";
import { IIngredient } from "../../utils/types/ingredient.types";

export const OPEN_MODAL: "OPEN_MODAL" = "OPEN_MODAL";
export const CLOSE_MODAL: "CLOSE_MODAL" = "CLOSE_MODAL";

interface IOpenModal{
  readonly type: typeof OPEN_MODAL;
  readonly payload: IIngredient;
}
interface ICloseModal{
  readonly type: typeof CLOSE_MODAL;
}

export type TModal = IOpenModal | ICloseModal;

export const ModalActionCreator = {
  openModal: () => (dispatch: Store['dispatch']) => {
    dispatch({
      type: OPEN_MODAL,
    });
  },
  closeModal: () => (dispatch: Store['dispatch']) => {
    dispatch({
      type: CLOSE_MODAL,
    });
  },
};