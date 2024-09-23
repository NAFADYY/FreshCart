import axios from "axios";
import { useMutation } from "react-query";

const useAddToCart = () => {
  const addToCart = async (productId) => {
    return await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId,
      },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  };
  const addProducts = useMutation({
    mutationFn: addToCart,
  });
  return addProducts;
};

export default useAddToCart;
