import {useNavigate} from "react-router-dom"
import { useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
export default function Login(){
    const navigate=useNavigate();
    const emailRef=useRef();
    const passwordRef=useRef();
    const {login}=useAuth();
    
    async function loginUser(e){
        e.preventDefault();
        const response=await axios.post("http://localhost:4000/user/login",{
            email:emailRef.current.value,
            password:passwordRef.current.value,
        })
        console.log(response.data);
        login({name:response.data.name,token:response.data.token})
        navigate("/products");
    }
    return(
        <div className="bg-gray-200 flex items-center justify-center min-h-[500px]">
            <form onSubmit={loginUser} method="post" className="px-11 py-11 bg-white rounded-2xl w-1/3 flex flex-col items-center gap-2">
                <h3 className="font-bold text-xl text-center ">Login</h3>
                <div className="bg-amber-600 w-[80px] h-1 mb-4 rounded-lg"></div>
                <input ref={emailRef} className="px-2 py-1.5 rounded-lg w-full bg-gray-100" type="email" placeholder="Email"/>
                <input ref={passwordRef} className="px-2 py-1.5 rounded-lg w-full bg-gray-100" type="password" placeholder="Password"/>
                <button className="px-2 py-1.5 rounded-lg w-full bg-amber-600 font-medium text-lg mt-2 text-white" type="submit">Login</button>
            </form>
        </div>
    )
}