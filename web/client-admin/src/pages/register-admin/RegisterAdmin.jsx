import "./register-admin.css"
import CustomButton from "../../components/Button/CustomButton"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { registerAdmin } from "../../stores/actions/actionCreator"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastErrorWrapper from "../../components/ToastErrorWrapper/ToastErrorWrapper"
function RegisterAdmin() {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleRegisterAdmin = (e) => {
        e.preventDefault()
        dispatch(registerAdmin(user))
        .then(() => {
            navigate("/")
        })
        .catch((err) => {
            console.log(err, ">>>>>>");
            setError(err)
        })
    }

    return (
        <div className="register-admin">
            <div className="container-register">
            {error && <ToastErrorWrapper message={error} />}
                <h3>Register New Admin</h3>
                <form method="post" action="" className="register-form" onSubmit={handleRegisterAdmin}>
                    <div className="form-row">
                        <label htmlFor="">Username</label>
                        <input type="text" name="username" onChange={handleChange}/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" onChange={handleChange}/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" onChange={handleChange}/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="">Phone Number</label>
                        <input type="text" name="phoneNumber" onChange={handleChange}/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="">Address</label>
                        <textarea name="address" id="" cols="30" rows="10" onChange={handleChange}></textarea>
                    </div>
                    <div className="button-form">
                        <CustomButton name="Save" type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterAdmin