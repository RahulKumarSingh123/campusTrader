import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
export default function MyListing(){
    const {token}=useAuth();
    const [products,setProducts]=useState([]);
    const deleteListing=async(id)=>{
        const response=await axios.delete(`http://localhost:4000/listing/delete/${id}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        if(response){
        const currentListings=products.filter((product)=>product._id!=id);
        setProducts([...currentListings]);
        }
    }
    const getProducts=async ()=>
        {
            try{
                const response=await axios.get("http://localhost:4000/listing/my",{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
                console.log(response);
                const items=response?.data?.data;
                setProducts([...items]);
            }
            catch(e)
            {
                console.log(e);
            }
        }
        useEffect(()=>{
            getProducts();
        },[]);
        return(
            <>
                <div className="w-full bg-gray-200 flex justify-end py-3 px-4">
                    <Link to="/addListing/new">
                    <button className="bg-amber-600 font-medium text-lg text-white px-2.5 py-1 rounded-lg mx-2">Add Listing</button>
                    </Link>
                </div>
            <div className="bg-gray-200 flex flex-wrap min-h-[500px] gap-6">
                {products.map((product)=>(
                    <div className="h-full  bg-white m-3 border-1 border-gray-300 w-[280px] rounded-xl p-4 ">
                    
                    <div className="flex flex-col gap-2  h-full" key={product._id}>
                        <img src={`http://localhost:4000/uploads/${product.imageName}`} className="rounded-lg w-full"></img>
                        <p className="text-lg font-medium ">{product.itemName}</p>
                        <p className="text-lg font-medium">Rs.{product.price}</p>
                    </div>
                    <div className="flex gap-2 justify-end">
                    <Link to={`/editDetails/${product._id}`}>
                    <button className="border-amber-600 border-1 font-medium text-lg text-gray-700 px-2.5 py-1 rounded-lg ml-2" >Edit</button>
                    </Link>
                    <button className="bg-amber-600 font-medium text-lg text-white px-2.5 py-1 rounded-lg mx-2" onClick={()=>deleteListing(product._id)}>Delete</button>
                    </div>
                    </div>
                ))}
            </div>
            </>
        )
}