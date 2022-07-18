import { IIngredient } from "../../utils/types/ingredient.types";
import { TDispatch } from "../store";

export const OPEN_MODAL: "OPEN_MODAL" = "OPEN_MODAL";
export const CLOSE_MODAL: "CLOSE_MODAL" = "CLOSE_MODAL";

interface IOpenModal{
  readonly type: typeof OPEN_MODAL;
  readonly payload?: IIngredient;
}
interface ICloseModal{
  readonly type: typeof CLOSE_MODAL;
}

export type TModal = IOpenModal | ICloseModal;

export const ModalActionCreator = {
  openModal: () => (dispatch: TDispatch) => {
    dispatch({
      type: OPEN_MODAL,
    });
  },
  closeModal: () => (dispatch: TDispatch) => {
    dispatch({
      type: CLOSE_MODAL,
    });
  },
};