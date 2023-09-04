import { useEffect, useState } from "react"
import "./login.css"
import { useDispatch, useSelector} from "react-redux"
import { loginAdmin } from "../../stores/actions/actionCreator"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginPage(){
  
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [dataLogin, setDataLogin] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e?.target
        setDataLogin({
            ...dataLogin,
            [name]: value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(loginAdmin(dataLogin))
      .then((data) => {
        if (!data) {
          throw new Error("error");
        }
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid username or password")
      });
        
    }

    return (
        <div className="start-login">
             <ToastContainer />
            <div className="container">
                <form className="login-form" method="post" onSubmit={handleLogin}>
                    <h3>LOGIN</h3>
                    <div className="form-control">
                        <label htmlFor="">Email:</label>
                        <input type="text" placeholder="you@mail.com" name="email" onChange={handleChange}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="">Password:</label>
                        <input type="password" placeholder="your password" name="password" onChange={handleChange}/>
                    </div>
                    <button className="login-button" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage