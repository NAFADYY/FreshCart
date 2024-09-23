import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import Loader from "../../Loader/Loader";
import Swal from "sweetalert2";
import CartProduct from "../../CartProduct/CartProduct";
import { Link } from "react-router-dom";
import cartIcon from "../../../../public/images/images/empty-cart.png";
import { Helmet } from "react-helmet";
import ErrorComponenet from "../../ErrorComponenet/ErrorComponenet";
import { CartCountContext } from "../../../Contexts/CartCountContext";
import { useMutation } from "react-query";
import { removeProductCart } from "../../../hooks/Cart/useCart";

const Cart = () => {
  const { userToken } = useContext(AuthContext);
  const [cartProducts, setCartProducts] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [increaseLodaing, setIncreaseLodaing] = useState(false);
  const [decreaseLoading, setDecreaseLoading] = useState(false);
  const [productId, setProductId] = useState(null);
  const { setCartNumber } = useContext(CartCountContext);
  const { mutateAsync: RemoveProductFromCart } = useMutation({
    mutationFn: removeProductCart,
  });
  const deleteProductFromCart = async (productId) => {
    const response = await RemoveProductFromCart({ productId });
    await setCartProducts(response);
    await setCartNumber(response.data.products.length);
  };

  const deleteHandeller = (productId, message) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-700 text-white px-2 px-3 py-1 rounded-md border-none outline-none mx-1",
        cancelButton:
          "bg-red-700 text-white px-3 py-1 rounded-md border-none mx-1",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (!productId) {
            deleteAllProducts();
          } else {
            deleteProductFromCart(productId);
          }

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Deleted Successfully.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const getProductsInCart = async () => {
    setIsLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: userToken,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setCartProducts(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error.message);
      });
    setIsError(false);
  };

  const updateProductsInCart = async (
    productId,
    productsCount,
    currentCount
  ) => {
    if (productsCount <= 0) {
      deleteHandeller(productId);
      return;
    }
    if (productsCount < currentCount) {
      setDecreaseLoading(true);
    } else {
      setIncreaseLodaing(true);
    }
    setProductId(productId);
    await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: productsCount,
        },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((response) => {
        setCartProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
    setIncreaseLodaing(false);
    setDecreaseLoading(false);
    setIsError(false);
  };

  const deleteAllProducts = async () => {
    setIsLoading(true);
    await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: userToken,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setCartProducts(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setIsError(true);
      });
    setCartNumber(0);
    setIsError(false);
  };

  useEffect(() => {
    getProductsInCart();
  }, []);

  if (isError) return <ErrorComponenet />;
  if (loading) return <Loader />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="min-h-screen bg-gray-100 pt-10">
        <Helmet>
          <title>Cart</title>
        </Helmet>
        <h1 className="mb-10 mx-6 text-3xl">Shop Cart :</h1>
        <button
          disabled={!cartProducts?.data?.products.length}
          onClick={() =>
            deleteHandeller(
              false,
              "You won't be able to delete all products in your cart?"
            )
          }
          className={`mx-6 mb-2 rounded-lg text-slate-800 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center ${
            !cartProducts?.data?.products.length
              ? "bg-gray-200"
              : "hover:text-red-600 text-sm bg-white hover:bg-slate-100"
          }`}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </span>
          <span>Remove All Products</span>
        </button>

        <div className="mx-6 justify-center md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {!cartProducts?.data?.products.length && (
              <h2 className="text-lg">
                <img src={cartIcon} alt="Empty Cart" />
              </h2>
            )}
            {cartProducts?.data?.products?.map((product, index) => (
              <CartProduct
                product={product}
                deleteHandeller={deleteHandeller}
                updateProductsInCart={updateProductsInCart}
                increaseLoading={increaseLodaing}
                decreaseLoading={decreaseLoading}
                productId={productId}
                key={index}
              />
            ))}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">
                {cartProducts?.totalCartPrice?.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">Free</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold text-right">
                  {cartProducts?.data?.products.length
                    ? cartProducts?.data.totalCartPrice?.toLocaleString() +
                      " EGP"
                    : "0"}
                </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <Link
              to={
                cartProducts?.data?.products.length
                  ? `/FreshCart/checkOut/${cartProducts?.data?._id}`
                  : ""
              }
              disabled={!cartProducts?.data?.products.length}
              className={`mt-6 block text-center w-full rounded-md  py-1.5 font-medium text-blue-50 ${
                !cartProducts?.data?.products.length
                  ? "bg-gray-600 cursor-default"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Check out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
