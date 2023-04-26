import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Login from "../Pages/login.js";
import Register from "../Pages/register.js";
import Profile from "../Pages/Profile.js";
import AdminPage from "../Pages/AdminPanel/AdminPage.js";
import AddCategory from "../Pages/AdminPanel/AddCategory.js";
import Products from "../Pages/AdminPanel/Products.js";
import ProtectedRoute from "./privat.js";
import Header from "../Pages/Header.js";
import UpdateProduct from "../Pages/AdminPanel/UpdateProduct.js";
import CreateProduct from "../Pages/AdminPanel/addProduct.js";
import Categories from "../Pages/AdminPanel/Categories.js";


function Router() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Header />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="adminpage" element={<ProtectedRoute><AdminPage /></ProtectedRoute>}>
              <Route path="products/createProduct" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>}/>
            
              <Route path="addCategory" element={<ProtectedRoute><AddCategory /></ProtectedRoute>}/>
              <Route path="products/updateproduct/:id" element={<ProtectedRoute><UpdateProduct /></ProtectedRoute>}/>
              <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>}/>
              <Route path="categories" element={<ProtectedRoute><Categories /></ProtectedRoute>}/>
              
              
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;