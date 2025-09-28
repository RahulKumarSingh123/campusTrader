import Layout from "./layouts/Layout"
import ProductDetails from "./pages/ProductsDetails";
import Products from "./pages/Products";
import SearchPage from "./pages/SearchPage";
import { Routes,Route } from "react-router-dom"
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyListing from "./pages/MyListing";
import EditDetails from "./pages/EditDetails";
import AddListing from "./pages/AddListing";
import EditImage from "./pages/EditImage";
function App() {
  const [searchResults,setSearchResults]=useState();
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout setSearchResults={setSearchResults}/>}>
        <Route element={<Products/>} index/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/mylisting" element={<MyListing/>}/>
        <Route path="/editDetails/:id" element={<EditDetails/>}/>
        <Route path="/addListing/:id" element={<AddListing/>}/>
        <Route path="/editImage/:id" element={<EditImage/>}/>
        <Route path="/productsDetails/:id" element={<ProductDetails/>}/>
        <Route path="search" element={<SearchPage searchResults={searchResults}/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
