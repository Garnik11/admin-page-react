import { Navigate, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { useEffect } from "react";



const ProtectedRoute = (props) => {
 const navigate = useNavigate();
 const token = localStorage.getItem("token")
 const decodedToken = decodeToken(token);
 const checkUserToken = () => {
     if (!token || token === 'undefined' || decodedToken.role === 0) {
         return navigate('/login');
     }
 }
 useEffect(() => {
         checkUserToken();
     }, [decodeToken]);
 return (
     <>
         {
             decodeToken ? props.children : null
         }
     </>
 );
}
export default ProtectedRoute