import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ToastWarnWrapper({ message }) {
    useEffect(() => {
        if(message) {
            toast.warn(message)
        }
    }, [message])

    return <ToastContainer />
}