import { actionCreators } from "../services/actions/action-creators";
// import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useTypedDispatch } from "../services/store";

export const useActions = () => {
  const dispatch = useTypedDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
