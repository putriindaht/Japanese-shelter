import { API_URL } from "../config/api";
import {
  POST_LOADING,
  POST_SUCCESS,
  CATEGORY_LOADING,
  CATEGORY_SUCCESS,
  LOGIN,
  REGISTER,
  POST_DETAIL,
  CATEGORY_DETAIL,
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

export const fetchCategoryDetailSuccess = (payload) => {
  return {
    type: CATEGORY_DETAIL,
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
    type: POST_DETAIL,
    payload,
  };
};

export function fetchPosts() {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPostsLoading(true));
      const response = await fetch(API_URL + "/posts");
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
  return async (dispatch) => {
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

export function addPost(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL + "/posts/add", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const responseJSON = await response.json();
        dispatch(fetchPosts(responseJSON));
      } else {
        const errJSON = await response.json();
        throw errJSON;
      }
    } catch (err) {
      throw err.message;
    }
  };
}

export function editPost(payload, id) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL + `/posts/edit/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const responseJSON = await response.json();
        // dispatch(fetchPosts(responseJSON));
      } else {
        const errJSON = await response.json();
        throw errJSON;
      }
    } catch (err) {
      throw err.message;
    }
  };
}

export function deletePost(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL + `/posts/delete/${id}`, {
        method: "delete",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      if (response.ok) {
        const responseJSON = await response.json();
        dispatch(fetchPosts(responseJSON));
      } else {
        const errJSON = await response.json();
        throw errJSON;
      }
    } catch (err) {
      throw err.message;
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

export function fetchCategoryDetail(id) {
  return async (dispatch) => {
    try {
      dispatch(fetchCategoriesLoading(true));
      const response = await fetch(API_URL + "/categories/" + id);
      const responseJSON = await response.json();
      dispatch(fetchCategoryDetailSuccess(responseJSON));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(fetchCategoriesLoading(false));
    }
  };
}

export function addCategories(payload) {
  return async () => {
    if (!payload) {
      throw new Error("Category name is required");
    }
    try {
      await fetch(API_URL + "/categories/add", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          name: payload,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function editCategory(payload, id) {
  return async () => {
    if (!payload) {
      throw new Error("Category name is required");
    }
    try {
      await fetch(API_URL + "/categories/edit/" + id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          name: payload,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteCategory(categoryId) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${API_URL}/categories/delete/${categoryId}`,
        {
          method: "delete",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        },
      );
      dispatch(fetchCategories());
    } catch (err) {
      console.log(err);
    }
  };
}

export function loginAdmin(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL + "/login", {
        method: "post",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }
      if (!response.ok) {
        throw data.message;
      }
      return dispatch({ type: LOGIN, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function registerAdmin(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL + "/add-author", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(payload),
      });

      const parsedResponse = await response.json();
      if (response.ok) {
        dispatch({ type: REGISTER, payload: parsedResponse });
      } else {
        throw parsedResponse;
      }
    } catch (err) {
      throw err.message;
    }
  };
}
