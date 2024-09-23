import { createContext, useState } from "react";

export const ForgetPassContext = createContext();

const ForgetPassProvider = ({ children }) => {
  const haveKey = localStorage.getItem("rePasswordKey")
    ? localStorage.getItem("rePasswordKey")
    : "";
  const [forgetPassKey, setForgetPassKey] = useState(haveKey);
  return (
    <ForgetPassContext.Provider value={{ forgetPassKey, setForgetPassKey }}>
      {children}
    </ForgetPassContext.Provider>
  );
};

export default ForgetPassProvider;
