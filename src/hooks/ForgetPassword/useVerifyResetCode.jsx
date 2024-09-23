import axios from "axios";
import { useMutation } from "react-query";

const useVerifyResetCode = () => {
  const sendCode = async (resetCode) => {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        resetCode,
      }
    );
  };

  const verifyResetCode = useMutation({
    mutationFn: sendCode,
  });
  return verifyResetCode;
};

export default useVerifyResetCode;
