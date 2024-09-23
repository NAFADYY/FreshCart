import {
  faSpinner,
  faHeart as faHeartFull,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bounce, toast } from "react-toastify";
import useAddToWishList from "../../hooks/WishList/useAddToWishList";
import useRemoveFromWishList from "../../hooks/WishList/useRemoveFromWishList";

const WishList = ({
  productId,
  currentId,
  ids,
  setProductId,
  size = false,
}) => {
  const {
    mutateAsync: addProductsToWishList,
    isLoading: addToWishListLoading,
  } = useAddToWishList();

  const { mutateAsync: removeFromWishList, isLoading: removeLoading } =
    useRemoveFromWishList();

  const addToWishListHandler = async (productId) => {
    setProductId(productId);
    const response = await addProductsToWishList(productId);
    toast.success(response.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const removeFromWishListHandler = async (productId) => {
    setProductId(productId);
    await removeFromWishList({ productId });
    toast.success("Removed from WishiList", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  return (
    <div>
      {(addToWishListLoading || removeLoading) && currentId == productId ? (
        <div className="absolute top-0 bottom-0 start-0 end-0 flex justify-center items-center overlay">
          <FontAwesomeIcon
            className="animate-spin h-12 w-12"
            icon={faSpinner}
          />
        </div>
      ) : (
        ""
      )}
      {!ids?.includes(currentId) ? (
        <FontAwesomeIcon
          icon={faHeart}
          onClick={() => {
            addToWishListHandler(currentId);
          }}
          className={`cursor-pointer px-1 pt-3  ${
            size ? "text-3xl" : "text-xl"
          }`}
        />
      ) : (
        <FontAwesomeIcon
          icon={faHeartFull}
          onClick={() => {
            removeFromWishListHandler(currentId);
          }}
          className={`cursor-pointer px-1 pt-3  text-red-700 ${
            size ? "text-3xl" : "text-xl"
          }`}
        />
      )}
    </div>
  );
};

export default WishList;
