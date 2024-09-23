import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Login from "../Pages/Login/Login";

const ProtectRoute = ({ children }) => {
  const { userToken } = useContext(AuthContext);

  return userToken ? children : <Login />;
};

export default ProtectRoute;
