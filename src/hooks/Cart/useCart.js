import axios from "axios";
import { useQuery } from "react-query";

const getProductsInCart = () => {
  const userToken = localStorage.getItem("userToken");
  if (!userToken) return null;
  return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
};

export const removeProductCart = async ({ productId }) => {
  const response = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return response.data;
};

export const GetCartProducts = () => {
  return useQuery({
    queryKey: "cartProducts",
    queryFn: getProductsInCart,
  });
};
