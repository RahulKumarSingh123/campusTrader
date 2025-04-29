import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Layout({setSearchResults}){
    return(
        <div>
            <Navbar setSearchResults={setSearchResults}/>
            <Outlet/>
            <Footer/>
        </div>
    )
}