import { GetWishListItems } from "../../../hooks/useWishlist";
import Loader from "../../Loader/Loader";
import ErrorComponenet from "../../ErrorComponenet/ErrorComponenet";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import emptyWishList from "../../../../public/images/images/empty-cart.png";
import { useState } from "react";
import { AddProductToCart } from "../../AddProductsToCart/AddToCartLogic";
import {
  GetCartProducts,
  removeProductCart,
} from "../../../hooks/Cart/useCart";
import { toast } from "react-toastify";
import useRemoveFromWishList from "../../../hooks/WishList/useRemoveFromWishList";

const WishList = () => {
  const { data, isError, isLoading } = GetWishListItems();
  const [productId, setProductId] = useState(null);
  const wishListItems = data?.data?.data;
  const queryClient = useQueryClient();
  const { data: ProductsData } = GetCartProducts();
  const ProductsIds = ProductsData?.data?.data?.products?.map(
    (p) => p.product.id
  );
  const { mutateAsync: RemoveFromWishList, isLoading: removeLoading } =
    useRemoveFromWishList();

  const {
    mutateAsync: RemoveProductFromCart,
    isLoading: removeFromCartLoading,
  } = useMutation({
    mutationFn: removeProductCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cartProducts"]);
    },
  });

  const { mutateAsync: AddToCart, isLoading: AddToCartLoading } = useMutation({
    mutationFn: AddProductToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cartProducts"]);
    },
  });

  if (isError) return <ErrorComponenet />;
  if (isLoading) return <Loader />;
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">
        WishList
      </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-center my-5">
        {wishListItems?.length < 1 ? (
          <>
            <h2 className="text-2xl py-5">WishList Is Empty!</h2>
            <img
              src={emptyWishList}
              alt="Wishlist Is Empty"
              className="w-1/2 m-auto"
            />
          </>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-50  dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Remove From WishList
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wishListItems?.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b   hover:bg-gray-50 "
                >
                  <td className="p-4">
                    <img
                      src={item.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Apple iMac"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-center">
                    <button
                      disabled={
                        removeLoading && productId == item.id ? true : false
                      }
                      onClick={async () => {
                        setProductId(item.id);
                        await RemoveFromWishList({ productId: item.id });
                      }}
                      className="text-slate-800 hover:text-red-600 text-sm bg-white hover:bg-slate-100 border-y border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center disabled:cursor-not-allowed"
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
                      <div className="w-12 text-center">
                        {removeLoading && productId == item.id ? (
                          <FontAwesomeIcon
                            className="animate-spin h-4 w-4"
                            icon={faSpinner}
                          ></FontAwesomeIcon>
                        ) : (
                          "Remove"
                        )}
                      </div>
                    </button>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-center">
                    {item.title}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 text-center">
                    {item.price} EGP
                  </td>
                  <td className="px-6 py-4 text-center">
                    {ProductsIds?.includes(item.id) ? (
                      <button
                        onClick={async () => {
                          setProductId(item.id);
                          await RemoveProductFromCart({
                            productId: item.id,
                          });
                          toast.success(
                            "Product removed from cart successfully"
                          );
                        }}
                        disabled={removeFromCartLoading && item.id == productId}
                        className=" text-slate-800 hover:text-red-600 text-sm bg-white hover:bg-slate-100 border-y border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center disabled:bg-slate-300 disabled:hover:bg-slate-300 disabled:hover:text-black"
                      >
                        <span>
                          {removeFromCartLoading && item.id == productId ? (
                            <FontAwesomeIcon
                              className="animate-spin h-4 w-4"
                              icon={faSpinner}
                            ></FontAwesomeIcon>
                          ) : (
                            "Remove From Cart"
                          )}
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={async () => {
                          setProductId(item.id);
                          const response = await AddToCart({
                            productId: item.id,
                          });
                          toast.success(response.message);
                        }}
                        disabled={AddToCartLoading && item.id == productId}
                        className=" text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border-y border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center disabled:bg-slate-300 disabled:hover:bg-slate-300 disabled:hover:text-black"
                      >
                        <span>
                          {AddToCartLoading && item.id == productId ? (
                            <FontAwesomeIcon
                              className="animate-spin h-4 w-4"
                              icon={faSpinner}
                            ></FontAwesomeIcon>
                          ) : (
                            "Add To Cart"
                          )}
                        </span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* <button
          onClick={() => {
            removeFromWishList();
          }}
        >
          Test
        </button> */}
      </div>
    </div>
  );
};

export default WishList;
