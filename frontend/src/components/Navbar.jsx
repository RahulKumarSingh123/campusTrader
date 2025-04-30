import {Search} from "lucide-react"
import { useRef } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
export default function Navbar({setSearchResults})
{
    const {token,logout}=useAuth();
    const searchRef=useRef();
    async function searchProduct(e)
    {
        e.preventDefault();
        console.log(searchRef.current.value)
        const response=await axios.get(`http://localhost:4000/listing/search?listing=${searchRef.current.value}`);
        console.log(response.data);
        if(response.data.data==null)
            setSearchResults([]);
        else
            setSearchResults([...response.data.data]);
        searchRef.current.value="";
    }
    return(
        <div className="bg-white flex px-9 py-4 items-center justify-between">
            <div className="flex items-center justify-start">
                <h1 className="font-bold text-2xl text-amber-600">Campus Trade</h1>
            </div>
            <div className="flex items-center">
                <Link  to={"/search"}>
                    <input type="search" placeholder="Search Products" ref={searchRef} className="py-1.5 px-4 bg-gray-100 rounded-l-lg focus:outline-0"/>
                </Link>
                <button onClick={searchProduct}><Search className="bg-gray-100 rounded-r-lg h-9 w-9 py-2"/></button>
            </div>
            <div className="flex items-center gap-3">
                    <Link to="products">
                        <p className="font-medium text-sm text-gray-700">Products</p>
                    </Link>
                {token?<div className="flex items-center gap-1">
                        <Link to="mylisting">
                        <p className="font-medium text-sm text-gray-700">My Listing</p>
                        </Link>
                        <button className="bg-amber-600 font-medium text-lg text-white px-2.5 py-1 rounded-lg mx-2" onClick={logout} >Logout</button>
                    </div>
                    :<div><Link to="/register">
                    <button className="border-amber-600 border-1 font-medium text-lg text-gray-700 px-2.5 py-1 rounded-lg ml-2" >Signup</button>
                </Link>
                <Link to="/login">
                <button className="bg-amber-600 font-medium text-lg text-white px-2.5 py-1 rounded-lg mx-2" >Login</button>
                </Link></div>
}
            </div>
        </div>
    )
}