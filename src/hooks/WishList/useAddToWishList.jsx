import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const useAddToWishList = () => {
  const queryClient = useQueryClient();
  const addProductToWishList = async (productId) => {
    return await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        productId: productId,
      },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  };

  const addToWishList = useMutation({
    mutationFn: addProductToWishList,
    onSuccess: () => {
      queryClient.invalidateQueries(["getWishListItems"]);
    },
  });
  return addToWishList;
};

export default useAddToWishList;
