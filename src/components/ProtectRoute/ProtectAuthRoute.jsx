import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router";

const ProtectAuthRoute = ({ children }) => {
  const { userToken } = useContext(AuthContext);
  return userToken ? <Navigate to="/"></Navigate> : children;
};

export default ProtectAuthRoute;
