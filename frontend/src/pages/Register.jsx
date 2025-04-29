import {useNavigate} from "react-router-dom"
import { useRef } from "react";
import axios from "axios";
export default function Register(){
    const navigate=useNavigate();
    const nameRef=useRef();
    const emailRef=useRef();
    const mobileRef=useRef();
    const sicRef=useRef();
    const passwordRef=useRef();
    async function registerUser(e){
        e.preventDefault();
        console.log("hello")
        const response=await axios.post("http://localhost:4000/user/add",{
            name:nameRef.current.value,
            email:emailRef.current.value,
            mobile:mobileRef.current.value,
            sic:sicRef.current.value,
            password:passwordRef.current.value,
        });
        console.log(response.data);

        navigate("/login");
    }
    return(
        <div className="bg-gray-200 flex items-center justify-center min-h-[500px]">
            <form method="post" className="px-11 py-11 bg-white rounded-2xl w-1/3 flex flex-col items-center gap-2" onSubmit={registerUser}>
                <h3 className="font-bold text-xl text-center ">Register</h3>
                <div className="bg-amber-600 w-[80px] h-1 mb-4 rounded-lg"></div>
                <input ref={nameRef} className="px-5 py-1.5 rounded-lg w-full bg-gray-100" type="text" placeholder="Name"/>
                <input ref={emailRef} className="px-5 py-1.5 rounded-lg w-full bg-gray-100" type="email" placeholder="Email"/>
                <input ref={mobileRef} className="px-5 py-1.5 rounded-lg w-full bg-gray-100" type='tel' placeholder="Mobile"/>
                <input ref={sicRef} className="px-5 py-1.5 rounded-lg w-full bg-gray-100" type="text" placeholder="Sic"/>
                <input ref={passwordRef} className="px-5 py-1.5 rounded-lg w-full bg-gray-100" type="password" placeholder="Password"/>
                <button className="px-2 py-1.5 rounded-lg w-full bg-amber-600 font-medium text-lg mt-2 text-white" type="submit">Register</button>
            </form>
        </div>
    )
}