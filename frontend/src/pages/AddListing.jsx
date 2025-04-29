import { useRef } from "react"
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function AddListing(){
    const navigate=useNavigate()
    const {token} =useAuth();
    const titleRef=useRef();
    const descriptionRef=useRef();
    const categoryRef=useRef();
    const statusRef=useRef();
    const priceRef=useRef();
    const conditionRef=useRef();
    const imageRef=useRef();
    async function addListing(e){
        e.preventDefault();
        console.log(imageRef.current.files[0])
        const response=await axios.post("http://localhost:4000/listing/add",{
            itemName:titleRef.current.value,
            description:descriptionRef.current.value,
            category:categoryRef.current.value,
            condition:conditionRef.current.value,
            status:statusRef.current.value,
            price:priceRef.current.value,
            img:imageRef.current.files[0],
        },{
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'multipart/form-data'
            }
        })
        if(response?.data?.success)
        {
            navigate("/listing/my")
        }
    }
    return(
        <div className="bg-gray-200 flex items-center justify-center min-h-[600px]">
            <form method="post" className="px-11 py-11 bg-white rounded-2xl w-1/3 flex h-full flex-col items-center gap-2" onSubmit={addListing}>
                <h3 className="font-bold text-xl text-center ">Add Product</h3>
                <div className="bg-amber-600 w-[80px] h-1 mb-4 rounded-lg"></div>
                <input ref={titleRef} className="px-5 py-1.5 rounded-lg w-full bg-gray-100" type="text" placeholder="Product Title"/>
                <textarea ref={descriptionRef} className="px-5 py-1.5 rounded-lg w-full bg-gray-100" type="text" placeholder="Description"/>
                <input ref={categoryRef} className="px-5 py-1.5 rounded-lg w-full bg-gray-100" type='text' placeholder="Category"/>
                <input ref={conditionRef} className="px-5 py-1.5 rounded-lg w-full bg-gray-100" type="text" placeholder="Condition"/>
                <input ref={priceRef} className="px-5 py-1.5 rounded-lg w-full bg-gray-100" type='number' placeholder="Price"/>
                <input ref={statusRef} className="px-5 py-1.5 rounded-lg w-full bg-gray-100" type="text" placeholder="Status"/>
                <input ref={imageRef} className="px-5 py-1.5 rounded-lg w-full bg-gray-100" type="file"/>
                <button className="px-2 py-1.5 rounded-lg w-full bg-amber-600 font-medium text-lg mt-2 text-white" type="submit">Add Product</button>
            </form>
        </div>
    )
}