import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ToastErrorWrapper({ message }) {
    useEffect(() => {
        if(message) {
            toast.error(message)
        }
    }, [message])

    return <ToastContainer />
}