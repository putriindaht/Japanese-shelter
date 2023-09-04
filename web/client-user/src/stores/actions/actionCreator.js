import { API_URL } from "../config/api";
import {
  POST_LOADING,
  POST_SUCCESS,
  CATEGORY_LOADING,
  CATEGORY_SUCCESS,
  DETAIL_SUCCESS,
  SELECTED_CATEGORY,
} from "./actionType";

export const fetchPostsSuccess = (payload) => {
  return {
    type: POST_SUCCESS,
    payload,
  };
};

export const fetchPostsLoading = (payload) => {
  return {
    type: POST_LOADING,
    payload,
  };
};

export const fetchCategoriesSuccess = (payload) => {
  return {
    type: CATEGORY_SUCCESS,
    payload,
  };
};

export const fetchCategoriesLoading = (payload) => {
  return {
    type: CATEGORY_LOADING,
    payload,
  };
};

export const fetchDetailSuccess = (payload) => {
  return {
    type: DETAIL_SUCCESS,
    payload,
  };
};

export const setSelectedCategory = (payload) => {
  return {
    type: SELECTED_CATEGORY,
    payload,
  };
};

export function fetchPosts(categoryId) {
  return async (dispatch) => {
    try {
      dispatch(fetchPostsLoading(true));
      let response;
      if (categoryId) {
        response = await fetch(API_URL + "/posts?categoryId=" + categoryId);
      } else {
        response = await fetch(API_URL + "/posts");
      }
      const responseJSON = await response.json();
      dispatch(fetchPostsSuccess(responseJSON));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(fetchPostsLoading(false));
    }
  };
}

export function fetchDetailPost(slug) {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPostsLoading(true));
      const response = await fetch(API_URL + "/posts/" + slug);
      const responseJSON = await response.json();
      dispatch(fetchDetailSuccess(responseJSON));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(fetchPostsLoading(false));
    }
  };
}

export function fetchCategories() {
  return async (dispatch) => {
    try {
      dispatch(fetchCategoriesLoading(true));
      const response = await fetch(API_URL + "/categories");
      const responseJSON = await response.json();
      dispatch(fetchCategoriesSuccess(responseJSON));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(fetchCategoriesLoading(false));
    }
  };
}
