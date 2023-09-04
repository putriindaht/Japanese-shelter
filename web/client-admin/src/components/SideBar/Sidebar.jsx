import './sidebar.css'
import { NavLink, useNavigate } from 'react-router-dom'
function SideBar(){
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <div className="container-main">
            <div className="side-bar">
                <div className="brand">
                    Japanese Shelter
                </div>
                <ul className="side-bar-list">
                    <li>
                        <NavLink to="/" className={({ isActive }) =>
                        isActive ? "active flex" : "flex"}>
                            <span className="material-symbols-outlined">home</span>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/category" className={({ isActive }) =>
                        isActive ? "active flex" : "flex"} >
                            <span className="material-symbols-outlined">category</span>
                            <span>Categories</span>
                        </NavLink>
                        </li>
                    
                    <li>
                        <NavLink to="/register-admin" className={({ isActive }) =>
                        isActive ? "active flex" : "flex"}>
                            <span className="material-symbols-outlined">how_to_reg</span>
                            <span>Register Admin</span>
                        </NavLink>
                    </li>
                </ul>
                <div className="flex" onClick={handleLogout}> 
                    <span className="material-symbols-outlined">logout</span>
                    <span >Log out</span>
                </div>
            </div>
        </div>
    )
}

export default SideBar