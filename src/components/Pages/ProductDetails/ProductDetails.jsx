import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RatingStar from "../../RatingStar/RatingStar";
import Loader from "../../Loader/Loader";
import ProductSlider from "../../ProductSlider/ProductSlider";
import RelatedProducts from "../../RelatedProducts/RelatedProducts";
import { Helmet } from "react-helmet";
import useAddToCart from "../../../hooks/Cart/useAddToCart";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import WishList from "../../WishList/WishList";
import { GetWishListItems } from "../../../hooks/useWishlist";

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [Loading, setLoading] = useState(false);
  const { mutateAsync: addToCart, isLoading } = useAddToCart();
  const { data } = GetWishListItems();
  const productsInWishList = data?.data?.data;
  const ids = productsInWishList?.map((p) => p.id);
  const [productId, setProductId] = useState(false);

  const getProductDetails = async () => {
    setLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products/" + id)
      .then((response) => {
        setLoading(false);
        setProductDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  const addToCartHandler = async (productId) => {
    try {
      const req = await addToCart(productId);
      toast.success(req.data.message);
    } catch (e) {
      console.log(e.message);
    }
  };

  if (Loading) {
    return <Loader />;
  }

  return (
    <>
      {productDetails && (
        <div className="bg-white">
          <Helmet>
            <title>Product Details</title>
          </Helmet>
          <main className="my-8">
            <div className="md:flex md:items-center ">
              <div className="w-full  md:w-1/3 ">
                <ProductSlider
                  images={productDetails?.images}
                  imageAlt={productDetails?.title}
                />
              </div>
              <div className="w-full  mx-auto mt-5 md:ml-8 md:mt-0 ">
                <h3 className="text-gray-700 uppercase text-2xl">
                  {productDetails?.title}
                </h3>
                <hr className="my-3" />

                <span className="text-gray-500 mt-3 text-2xl">
                  ${productDetails?.price.toLocaleString()}
                </span>

                <div className="mt-3">
                  <label className="text-gray-700 text-md" htmlFor="count">
                    Rating:
                  </label>
                  <RatingStar ratingsAverage={productDetails?.ratingsAverage} />
                </div>
                <div className="mt-3">
                  <label className="text-gray-700 text-md pe-2" htmlFor="count">
                    Description:
                  </label>
                  {productDetails?.description}
                </div>

                <div className="mt-3">
                  <label className="text-gray-700 text-md pe-2" htmlFor="count">
                    Category:
                  </label>

                  {productDetails?.category.name}
                </div>
                <div className="mt-3">
                  <label className="text-gray-700 text-md pe-2" htmlFor="count">
                    SubCategory:
                  </label>
                  {productDetails?.subcategory[0].name}
                </div>
                <div className="mt-3">
                  <label className="text-gray-700 text-md pe-2" htmlFor="count">
                    Brand:
                  </label>
                  {productDetails?.brand.name}
                </div>
                <div className="mt-3 flex justify-end">
                  <WishList
                    productId={productId}
                    setProductId={setProductId}
                    ids={ids}
                    currentId={productDetails?.id}
                    size={true}
                  />
                </div>
                <div className="mt-6">
                  <button
                    disabled={isLoading}
                    onClick={() => {
                      addToCartHandler(productDetails?.id);
                    }}
                    className="w-full px-8 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500 disabled:bg-gray-500 hover:bg-gray-500 disabled:cursor-not-allowed"
                  >
                    {!isLoading ? (
                      "Add To Cart"
                    ) : (
                      <FontAwesomeIcon
                        className="animate-spin h-4 w-4"
                        icon={faSpinner}
                      ></FontAwesomeIcon>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <RelatedProducts categoryId={productDetails?.category._id} />
          </main>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
