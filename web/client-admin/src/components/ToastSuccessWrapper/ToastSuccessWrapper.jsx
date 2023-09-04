import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ToastSuccessWrapper({ message }) {
    useEffect(() => {
        if(message) {
            toast.success(message)
        }
    }, [message])

    return <ToastContainer />
}