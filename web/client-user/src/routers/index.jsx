import {createBrowserRouter} from 'react-router-dom'
import BaseLayout from '../layouts/BaseLayout'
import HomePage from '../pages/HomePage'
import DetailPage from '../pages/DetailPage'
const router = createBrowserRouter([
    {
        element: <BaseLayout/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/post/:slug",
                element: <DetailPage/>
            }
        ]
    }
])

export default router