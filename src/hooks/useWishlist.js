import axios from "axios";
import { useQuery } from "react-query";

// export const addProductToWishList = async ({ productId }) => {
//   const response = await axios.post(
//     "https://ecommerce.routemisr.com/api/v1/wishlist",
//     {
//       productId: productId,
//     },
//     {
//       headers: {
//         token: localStorage.getItem("userToken"),
//       },
//     }
//   );
//   return response.data;
// };

const getWishListItems = () => {
  return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
};

// export const removeProductFromWishList = async ({ productId }) => {
//   await axios.delete(
//     `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
//     {
//       headers: {
//         token: localStorage.getItem("userToken"),
//       },
//     }
//   );
// };

export const GetWishListItems = () => {
  return useQuery({
    queryKey: ["getWishListItems"],
    queryFn: getWishListItems,
  });
};
