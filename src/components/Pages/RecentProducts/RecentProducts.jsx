import { useContext, useEffect, useState } from "react";
import RatingStar from "../../RatingStar/RatingStar";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { AddToCart } from "../../AddProductsToCart/AddToCartLogic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { CartCountContext } from "../../../Contexts/CartCountContext";
import { GetWishListItems } from "../../../hooks/useWishlist";

import { GetProducts } from "../../../hooks/useProducts";
import ErrorComponenet from "../../ErrorComponenet/ErrorComponenet";
import SearchProducts from "../../SearchProducts/SearchProducts";
import WishList from "../../WishList/WishList";

const RecentProducts = () => {
  const { data: getRecenetProducts, isLoading, isError } = GetProducts();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(false);
  const { setCartNumber } = useContext(CartCountContext);
  const { data } = GetWishListItems();
  const productsInWishList = data?.data?.data;
  const ids = productsInWishList?.map((p) => p.id);

  useEffect(() => {
    setProducts(getRecenetProducts?.data?.data);
    if (!products?.length < 1) {
      setProducts(products);
    }
  }, [getRecenetProducts]);

  const AddToCardHandeller = (productId) => {
    AddToCart(productId, setLoading, setCartNumber);
    setProductId(productId);
  };

  if (isError) return <ErrorComponenet />;
  if (isLoading) return <Loader />;

  return (
    <>
      <SearchProducts
        setProducts={setProducts}
        products={products}
        allProducts={getRecenetProducts}
      />

      <div className="font-bold">Search Results : {products?.length}</div>
      {products?.length < 1 && (
        <div className="w-full text-center">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="face-thinking"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="svg-inline--fa fa-face-thinking fa-4x"
            style={{ width: "100px", height: "100px" }}
          >
            <g className="fa-duotone-group">
              <path
                fill="#FFD35A"
                d="M0 256c0 45 11.6 87.3 32 124l0-28c0-30.9 25.1-56 56-56s56 25.1 56 56l0 3 92.2-33.5-82.4-34.7c-8.1-3.4-12-12.8-8.5-21s12.8-12 21-8.5l122.5 51.6c22.7 9.6 37.9 31.2 39.2 55.6c1.5 24.2-12.9 47.4-36.8 56.1l-35.8 13-21 57.7c-2.5 6.8-5.8 13.1-9.8 18.8c10.3 1.3 20.8 1.9 31.4 1.9c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256zM114.1 119.9c-4.4-7.7-1.7-17.4 6-21.8l7.1-4c35.2-20.1 79.3-15.9 110.1 10.5c4.4 3.8 8.8 7.5 13.2 11.3c6.7 5.8 7.5 15.9 1.7 22.6s-15.9 7.5-22.6 1.7l-13.2-11.3c-20.5-17.6-49.9-20.4-73.4-7l-7.1 4c-7.7 4.4-17.4 1.7-21.8-6zM208.4 176a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm160 16a32 32 0 1 1 -64 0 32 32 0 1 1 64 0z"
              />
              <path
                d="M143 121.9c23.5-13.4 52.9-10.6 73.4 7l13.2 11.3c6.7 5.8 16.8 5 22.6-1.7s5-16.8-1.7-22.6l-13.2-11.3C206.4 78.1 162.3 74 127.1 94.1l-7.1 4c-7.7 4.4-10.3 14.2-6 21.8s14.2 10.3 21.8 6l7.1-4zM176.4 208a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM112 352c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 26.5 21.5 48 48 48l47.2 0c20.2 0 38.2-12.6 45.1-31.6l26.1-71.7 49.8-18.1c12.5-4.5 18.9-18.3 14.4-30.8s-18.3-18.9-30.8-14.4L112 400.6l0-48.6zM368.4 192a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                className="fa-primary "
              />
            </g>
          </svg>
          <h2 className="text-5xl py-5">No Products Found!</h2>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {products?.map((product) => (
          <div
            className="product px-3 my-5 overflow-hidden relative"
            key={product.id}
          >
            <Link
              to={`/FreshCart/productDetails/${product.id}`}
              className="photo"
            >
              <img src={product.imageCover} alt={product.title} />
              <p className="text-green-600 tracking-tight line-clamp-1">
                {product.category.name}
              </p>
              <h3 className="text-xl line-clamp-1">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
            </Link>

            <div className="flex items-center justify-between">
              <div className="pt-3 text-xl">
                {product.price.toLocaleString()} EGP
              </div>
              <WishList
                productId={productId}
                currentId={product?.id}
                ids={ids}
                setProductId={setProductId}
              ></WishList>
            </div>

            <div className="py-2">
              <RatingStar ratingsAverage={product.ratingsAverage} />
            </div>

            <div className="product-btn text-center py-3 ">
              <button
                onClick={() => AddToCardHandeller(product._id)}
                disabled={loading && productId == product._id}
                className={` text-white rounded-md w-full  transition ${
                  loading && productId == product._id
                    ? "bg-gray-500 hover:bg-gray-500 "
                    : "bg-green-600 hover:bg-green-900"
                }`}
              >
                {loading && productId == product._id ? (
                  <FontAwesomeIcon
                    className="animate-spin h-4 w-4"
                    icon={faSpinner}
                  ></FontAwesomeIcon>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentProducts;
