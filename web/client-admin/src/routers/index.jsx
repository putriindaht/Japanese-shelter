import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import CategoryPage from "../pages/categories/CategoryPage"
import LoginPage from "../pages/login/LoginPage";
import BaseLayout from "../../layouts/BaseLayout";
import RegisterAdmin from "../pages/register-admin/RegisterAdmin";
import AddPost from "../pages/add-post/AddPost";
import AddCategory from "../pages/add-category/AddCategory"
import EditCategory from "../pages/edit-category/EditCategory"
import EditPostPage from "../pages/edit-post/EditPostPage";
const router = createBrowserRouter([
    {
        element: <BaseLayout/>,
        children: [
            {
                path: "/",
                element: 
                    <HomePage/>
            },
            {
                path: "/category",
                element: <CategoryPage/>,
            },
            {
                path: "/register-admin",
                element: <RegisterAdmin/>,
            },
            {
                path: "/category/add-category",
                element: <AddCategory/>
            },
            {
                path: "/category/edit-category/:id",
                element: <EditCategory/>
            },
            {
                path: "/add-post",
                element: <AddPost/>
            },
            {
                path: "/edit-post/:slug",
                element: <EditPostPage/>
            }
        ],
        loader: () => {
            if(!localStorage.getItem("access_token")){
                return redirect('/login')
            }
            return null
        }
    },
    {
        path: "/login",
        element: <LoginPage/>,
        loader: () => {
            if(localStorage.getItem("access_token")) {
                return redirect('/')
            }
            return null
        }

    }
  ]);

export default router