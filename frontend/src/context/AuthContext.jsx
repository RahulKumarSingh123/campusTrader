import { createContext,useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [name,setName]=useState(localStorage.getItem("name"));
    const [token,setToken]=useState(localStorage.getItem("token"));
    const navigate=useNavigate();
    function login(data){
        setName(data.name)
        setToken(data.token)
        localStorage.setItem("name", data.name)
        localStorage.setItem("token", data.token)
    }

    function logout()
    {
        setName(null)
        setToken(null)
        localStorage.removeItem("name")
        localStorage.removeItem("token")
        navigate("/products")
    }
    return(
        <AuthContext.Provider value={{name,token,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext);
}