import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const authtoken = JSON.parse(localStorage.getItem("userDetails"))?.token;

  return authtoken ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
