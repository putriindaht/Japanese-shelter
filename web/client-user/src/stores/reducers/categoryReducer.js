import {
  CATEGORY_LOADING,
  CATEGORY_SUCCESS,
  SELECTED_CATEGORY,
} from "../actions/actionType";

const initialState = {
  categories: [],
  categoriesLoading: false,
  selectedCategory: "",
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    case CATEGORY_LOADING:
      return {
        ...state,
        categoriesLoading: action.payload,
      };
    case SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
