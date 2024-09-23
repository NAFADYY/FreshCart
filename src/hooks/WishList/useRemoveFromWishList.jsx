import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const useRemoveFromWishList = () => {
  const queryClient = useQueryClient();
  const removeProductFromWishList = async ({ productId }) => {
    return await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  };

  const removeFromWishList = useMutation({
    mutationFn: removeProductFromWishList,
    onSuccess: () => {
      queryClient.invalidateQueries(["getWishListItems"]);
    },
  });
  return removeFromWishList;
};

export default useRemoveFromWishList;
