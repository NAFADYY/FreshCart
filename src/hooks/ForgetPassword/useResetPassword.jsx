import axios from "axios";
import { useMutation } from "react-query";

const useResetPassword = () => {
  const ResetPassword = async (data) => {
    return axios.put(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      data
    );
  };

  const resetPassword = useMutation({
    mutationFn: ResetPassword,
  });
  return resetPassword;
};

export default useResetPassword;
