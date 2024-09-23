import { Helmet } from "react-helmet";
import RecentProducts from "../RecentProducts/RecentProducts";

const Products = () => {
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <RecentProducts />
    </>
  );
};

export default Products;
