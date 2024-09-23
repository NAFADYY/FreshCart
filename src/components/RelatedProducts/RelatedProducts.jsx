import axios from "axios";
import RatingStar from "../RatingStar/RatingStar";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import WishList from "../WishList/WishList";
import { GetWishListItems } from "../../hooks/useWishlist";
import { toast } from "react-toastify";
import useAddToCart from "../../hooks/Cart/useAddToCart";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RelatedProducts = ({ categoryId }) => {
  const [relatedProducts, setRelatedProducts] = useState(null);
  const { data } = GetWishListItems();
  const productsInWishList = data?.data?.data;
  const ids = productsInWishList?.map((p) => p.id);
  const [productId, setProductId] = useState(false);
  const { mutateAsync: addToCart, isLoading } = useAddToCart();

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getRelatedProducts = async (category) => {
    await axios(`https://ecommerce.routemisr.com/api/v1/products`, {
      method: "GET",
      params: { category },
    })
      .then((response) => {
        setRelatedProducts(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCartHandler = async (productId) => {
    setProductId(productId);
    try {
      const req = await addToCart(productId);
      toast.success(req.data.message);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getRelatedProducts(categoryId);
  }, [categoryId]);

  return (
    <div className="mt-16">
      <h3 className="text-gray-600 text-2xl font-medium">More Products</h3>

      <Slider {...settings} className="mt-6 w-full">
        {relatedProducts?.map((product) => (
          <div key={product.id} className="w-full max-w-sm mx-auto cursor-grab">
            <div className="shadow-md mx-2 rounded-md overflow-hidden">
              <div
                className="flex items-end justify-end h-56 w-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${product.imageCover})`,
                }}
              >
                <button
                  disabled={isLoading && productId == product.id}
                  onClick={() => {
                    addToCartHandler(product.id);
                  }}
                  className="flex justify-center items-center w-7 h-7 p-1 rounded-full bg-green-600 text-white mx-5 hover:bg-green-500 focus:outline-none disabled:bg-gray-500"
                >
                  {isLoading && productId == product.id ? (
                    <FontAwesomeIcon
                      className="animate-spin h-5 w-5"
                      icon={faSpinner}
                    />
                  ) : (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="px-5 py-3">
                <Link
                  to={`/FreshCart/productDetails/${product.id}`}
                  className="cursor-pointer"
                >
                  <p className="text-green-600 tracking-tight line-clamp-1">
                    {product.category.name}
                  </p>
                  <h3 className="text-xl line-clamp-1">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                </Link>
                <div className="pt-3 text-xl">
                  {product.price.toLocaleString()} EGP
                </div>
                <div className="py-2">
                  <RatingStar ratingsAverage={product.ratingsAverage} />
                </div>
                <div className="py-2 relative">
                  <WishList
                    productId={productId}
                    setProductId={setProductId}
                    ids={ids}
                    currentId={product.id}
                  ></WishList>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RelatedProducts;
