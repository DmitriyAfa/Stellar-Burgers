import { useSelector, TypedUseSelectorHook } from "react-redux";
import { rootStateTypes } from "../services/reducers";

export const useTypedSelector: TypedUseSelectorHook<rootStateTypes> =
  useSelector;
