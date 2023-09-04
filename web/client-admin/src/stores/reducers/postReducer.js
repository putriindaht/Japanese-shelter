import { POST_DETAIL, POST_LOADING, POST_SUCCESS } from "../actions/actionType";

const initialState = {
  posts: [],
  postsLoading: false,
  post: {},
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
    case POST_DETAIL:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
