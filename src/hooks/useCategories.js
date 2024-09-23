import axios from "axios";
import { useQuery } from "react-query";

const getCategories = () => {
  return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
};

const Categories = () => {
  return useQuery({
    queryKey: "categories",
    queryFn: getCategories,
  });
};

export default Categories;
