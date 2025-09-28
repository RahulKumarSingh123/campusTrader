import { useState,useEffect } from "react";
import { useParams ,Link} from "react-router-dom";
import axios from "axios";
export default function EditDetails()
{
    const [product,setProduct]=useState({});
    const item_id=useParams();
    console.log(item_id.id);

    const getProduct=async()=>{
        const response=await axios.get(`http://localhost:4000/listing/get/${item_id.id}`);
        console.log(response);
        if(response.data.success)
        {
            setProduct({...response.data.data});
        }
        console.log(product.owner)
    }
    useEffect(()=>{
        getProduct();
    },[]);
    
    return(
        <div className="bg-gray-200 flex items-center justify-center min-h-[500px] gap-6">
            <div className="w-3/4 p-16 bg-white rounded-3xl flex flex-col gap-7 ">
            <div className="flex flex-wrap  ">
                <div className="w-1/2 p-5 pr-10">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <h2 className="font-bold text-3xl">{product.itemName}</h2>
                            <h4 className="font-medium w-fit h-fit text-gray-100 text-sm px-2 border-1 border-gray-200 rounded-3xl bg-amber-500">{product.condition}</h4>
                        </div>
                        <h4 className="font-semibold text-xl">₹{product.price}</h4>
                    </div>
                  
                        <h4 className="font-medium text-sm text-gray-600 my-1">{"--by " + product.owner?.name}</h4>                    
                    <p className="font-medium text-sm text-gray-500 my-5">{product.description}</p>
                    
                </div>
                <div className="w-1/2">
                    <img src={`http://localhost:4000/uploads/${product.imageName}`} className="rounded-2xl"/>
                </div>
            </div>
            <div className="flex gap-2 justify-end">
                <Link to={`/editImage/${item_id.id}`}><button className="border-amber-600 border-1 font-medium text-lg text-gray-700 px-2.5 py-1 rounded-lg ml-2" >Edit Image</button></Link>
                <Link to={`/addListing/${item_id.id}`}><button className="bg-amber-600 font-medium text-lg text-white px-2.5 py-1 rounded-lg mx-2">Edit Details</button>
                </Link>
            </div>
        </div>
        </div>
    )
}