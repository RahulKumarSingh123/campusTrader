import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
export default function EditImage(){
    const {id}=useParams();
    const {token}=useAuth();
    const [uploaded,setUploaded]=useState(false);
    const imageRef=useRef(null);
    const navigate=useNavigate();
    useEffect(()=>{
        setUploaded(!uploaded);
    },[imageRef.current])
    async function uploadImage(){
        const response=await axios.put(`http://localhost:4000/listing/updateImage/${id}`,{
            img:imageRef.current.files[0],
        },{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'multipart/form-data',
        });
        if(response.data.success)
            navigate("/mylisting")
    }
    return (
        <div  className="bg-gray-200 flex items-center justify-center min-h-[600px]">
            <div className="rounded-3xl bg-white md:w-2/4 h-[400px] flex flex-wrap  p-16 ">
                <input type="file" ref={imageRef} className="w-full h-2/3 opacity-0  relative z-10"/>
                <div className="rounded-2xl border-2 border-dashed p-7 border-gray-500 w-full h-2/3 flex items-center justify-center gap-3.5 relative bottom-[180px]">
                    <UploadCloud className="w-8 h-8 text-gray-600"/>
                    <p className="font-semibold text-lg text-gray-600">Click to Upload New Image</p>
                </div>
                <button disabled={imageRef.current===null} className="px-2 py-1.5 rounded-lg w-full bg-amber-600 font-medium text-lg mt-2 text-white bottom-[130px] relative" type="submit" onClick={uploadImage}>Upload Image</button>
            </div>
        </div>
    )
}