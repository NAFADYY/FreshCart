import axios from "axios";
import { useMutation } from "react-query";

const useSendCode = () => {
  const sendCode = async (email) => {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        email,
      }
    );
  };

  const forgetPassword = useMutation({
    mutationFn: sendCode,
  });
  return forgetPassword;
};

export default useSendCode;
