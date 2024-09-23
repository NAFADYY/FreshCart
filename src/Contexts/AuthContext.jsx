import { createContext, useState } from "react";

export const AuthContext = createContext("");

const AuthContextProvider = ({ children }) => {
  const haveToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : "";
  const [userToken, setUserToken] = useState(haveToken);
  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
