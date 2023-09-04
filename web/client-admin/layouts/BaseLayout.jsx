import SideBar from "../src/components/SideBar/Sidebar"
import { Outlet } from "react-router-dom"
function BaseLayout(){
    return (
        <>
        <SideBar/>
        <Outlet/>
        </>
    )
}

export default BaseLayout