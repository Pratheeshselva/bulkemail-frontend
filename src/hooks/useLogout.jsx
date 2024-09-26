import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogout() {
    let navigate = useNavigate()
    return () => {
        sessionStorage.clear()
        toast.success("Logout Successful")
        navigate('/login')
    }
}

export default useLogout