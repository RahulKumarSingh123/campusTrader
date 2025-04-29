import {Link} from "react-router-dom"
export default function SearchPage({searchResults}){
    return (
        <div className="min-h-[500px] bg-gray-100">
            {
                (!searchResults || searchResults.length==0)?
                <p className="px-20 py-20 text-gray-700 font-medium">No results found</p>
                :<div className="bg-gray-200 flex flex-wrap min-h-[500px] gap-6">
                {searchResults.map((product)=>(
                    <Link to={`/productsDetails/${product._id.toString()}`} className="h-full">
                    <div className="border-1 border-gray-300 rounded-xl p-4 flex flex-col gap-2 w-[280px] h-full bg-white m-3" key={product._id}>
                        <img src={`http://localhost:4000/uploads/${product.imageName}`} className="rounded-lg w-full"></img>
                        <p className="text-lg font-medium ">{product.itemName}</p>
                        <p className="text-lg font-medium">Rs.{product.price}</p>
                    </div>
                    </Link>
                ))}
            </div>
            }
        </div>
    )
}