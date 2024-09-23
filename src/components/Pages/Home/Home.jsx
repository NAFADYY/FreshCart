import { Helmet } from "react-helmet";
import Categories from "../../Categories/Categories";
import LandingSlider from "../../LandingSlider/LandingSlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import { useContext, useEffect } from "react";
import { CartCountContext } from "../../../Contexts/CartCountContext";
import { GetCartProducts } from "../../../hooks/Cart/useCart";

const Home = () => {
  const productsInCart = GetCartProducts();
  const cartCounts = productsInCart?.data?.data.numOfCartItems;
  const { setCartNumber } = useContext(CartCountContext);
  useEffect(() => {
    if (cartCounts) setCartNumber(cartCounts);
  }, [cartCounts]);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <LandingSlider />
      <Categories />
      <RecentProducts />
    </>
  );
};

export default Home;
