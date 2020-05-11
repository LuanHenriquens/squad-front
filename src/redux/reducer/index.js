import { combineReducers } from "redux";
import squadReducer from "./squadReducer";
import memberReducer from "./memberReducer";

export default combineReducers({
  squadReducer,
  memberReducer,
});
