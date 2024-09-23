import axios from "axios";
import { Bounce, toast } from "react-toastify";

export const AddToCart = async (productId, loadingState, setCartNumber) => {
  loadingState(true);

  await axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId,
      },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    )
    .then((response) => {
      loadingState(false);
      console.log(response.data.data.products.length);
      setCartNumber(response.data.data.products.length);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// With React Query
export const AddProductToCart = async ({ productId }) => {
  const response = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      productId: productId,
    },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return response.data;
};
