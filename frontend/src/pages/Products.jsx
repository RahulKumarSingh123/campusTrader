import { useState ,useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom";

export default function Products(){
    const getProducts=async ()=>
    {
        try{
            const response=await axios.get("http://localhost:4000/listing/getall");
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
    const [products,setProducts]=useState([]);
    return(
        <div className="bg-gray-200 flex flex-wrap min-h-[500px] gap-6">
            {products.map((product)=>(
                <Link to={`/productsDetails/${product._id.toString()}`} className="h-full">
                <div className="border-1 border-gray-300 rounded-xl p-4 flex flex-col gap-2 w-[280px] h-full bg-white m-3" key={product._id}>
                    <img src={`http://localhost:4000/uploads/${product.imageName}`} className="rounded-lg w-full"></img>
                    <p className="text-lg font-medium ">{product.itemName}</p>
                    <p className="text-lg font-medium">Rs.{product.price}</p>
                </div>
                </Link>
            ))}
        </div>
    )
}