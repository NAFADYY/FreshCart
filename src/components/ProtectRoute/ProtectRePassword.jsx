import { useContext } from "react";
import NotFound from "../Pages/NotFound/NotFound";
import { ForgetPassContext } from "../../Contexts/ForgetPassContext";

const ProtectRePassword = ({ children }) => {
  const { forgetPassKey } = useContext(ForgetPassContext);
  return !forgetPassKey ? <NotFound /> : children;
};

export default ProtectRePassword;
