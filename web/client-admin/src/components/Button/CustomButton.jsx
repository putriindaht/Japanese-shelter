import { Link } from "react-router-dom"
import "./customButton.css"
function CustomButton({to, name, type = "button"}){
    if (!to) {
        return <button className="custom-button" type={type}>{name}</button>
    }

    return (
        <Link to={to} className="custom-button" type={type}>{name}</Link>
    )
}

export default CustomButton