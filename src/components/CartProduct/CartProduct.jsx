import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartProduct = ({
  product,
  deleteHandeller,
  updateProductsInCart,
  increaseLoading,
  decreaseLoading,
  productId,
}) => {
  const [productCount, setProductCount] = useState(product.count);
  useEffect(() => {
    setProductCount(product.count);
  }, [product.count]);
  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src={product.product.imageCover}
        alt="product-image"
        className=" rounded-lg w-full sm:w-20"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <Link to={`/productDetails/${product.product._id}`}>
            <h2 className="text-lg text-gray-900 line-clamp-1">
              {product.product.title.split(" ").slice(0, 7).join(" ")}
            </h2>
          </Link>
          <h3 className="mt-1 text-green-700">Price: {product.price}EGP</h3>
          <h3
            onClick={() =>
              deleteHandeller(
                product.product._id,
                `You won't be able to delete ${product.product.title
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")} from your cart?`
              )
            }
            className="mt-1 text-green-700 cursor-pointer max-w-fit"
          >
            <FontAwesomeIcon icon={faTrash} className="pe-1"></FontAwesomeIcon>
            Remove
          </h3>
        </div>
        <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center justify-end border-gray-100">
            <button
              disabled={
                product.count == 1 ||
                (decreaseLoading && productId == product.product._id)
              }
              onClick={() => {
                updateProductsInCart(
                  product.product._id,
                  product.count - 1,
                  product.count
                );
              }}
              className="cursor-pointer rounded-l bg-gray-100 py-1 w-10 text-center duration-100 hover:bg-green-500 hover:text-blue-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black"
            >
              {decreaseLoading && productId == product.product._id ? (
                <FontAwesomeIcon
                  className="animate-spin h-4"
                  icon={faSpinner}
                ></FontAwesomeIcon>
              ) : (
                "-"
              )}
            </button>
            <span className="w-10">
              <input
                type="text"
                className="outline-none text-center w-full cursor-text"
                onChange={(e) => {
                  setProductCount(e.target.value);
                }}
                onBlur={() => {
                  if (product.count != productCount) {
                    updateProductsInCart(
                      product.product._id,
                      productCount,
                      product.count
                    );
                  }
                }}
                value={productCount}
              />
            </span>
            <button
              disabled={increaseLoading && productId == product.product._id}
              onClick={() => {
                updateProductsInCart(
                  product.product._id,
                  product.count + 1,
                  product.count
                );
              }}
              className="cursor-pointer rounded-r bg-gray-100 py-1 w-10 duration-100 hover:bg-green-500 hover:text-blue-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black"
            >
              {increaseLoading && productId == product.product._id ? (
                <FontAwesomeIcon
                  className="animate-spin h-4"
                  icon={faSpinner}
                ></FontAwesomeIcon>
              ) : (
                "+"
              )}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-lg text-green-700 text-end">
              Total Price {(product.count * product.price).toLocaleString()} EGP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
