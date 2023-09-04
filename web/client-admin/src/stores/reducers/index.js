import { combineReducers } from "redux";
import postReducer from "./postReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  post: postReducer,
  category: categoryReducer,
});

export default rootReducer;
