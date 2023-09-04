import {
  CATEGORY_DETAIL,
  CATEGORY_LOADING,
  CATEGORY_SUCCESS,
} from "../actions/actionType";

const initialState = {
  categories: [],
  categoriesLoading: false,
  categoryDetail: {},
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
    case CATEGORY_DETAIL:
      return {
        ...state,
        categoryDetail: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
