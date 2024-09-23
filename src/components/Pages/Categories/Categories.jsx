import { Helmet } from "react-helmet";
import categories from "../../../hooks/useCategories";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";
const Categories = () => {
  const { data, isLoading } = categories();
  const categoriesData = data?.data?.data;
  if (isLoading) {
    return <Loader />;
  }
  <Helmet>
    <title>Categories</title>
  </Helmet>;
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">
        All Categories
      </h2>
      <div className="flex flex-wrap py-5">
        {categoriesData?.map((category, index) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={index}>
            <Link
              to={`/FreshCart/subCategories/${category._id}/${category.name}`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-52 object-cover"
              />
              <h2>{category.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
