import {
  DETAIL_SUCCESS,
  POST_LOADING,
  POST_SUCCESS,
} from "../actions/actionType";

const initialState = {
  posts: [],
  postsLoading: false,
  detailPost: {},
};

const postReducer = (state = initialState, action) => {
  //buat kondisi
  switch (action.type) {
    case POST_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
    case POST_LOADING:
      return {
        ...state,
        postsLoading: action.payload,
      };
    case DETAIL_SUCCESS:
      return {
        ...state,
        detailPost: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
