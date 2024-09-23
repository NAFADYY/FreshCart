import axios from "axios";
import { useQuery } from "react-query";

const useGetSubCat = ({ categoryId }) => {
  const getSubCategories = async () => {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
    );
  };

  const getSubCategoriesQuery = useQuery({
    queryKey: ["getSubCategories", categoryId],
    queryFn: getSubCategories,
  });

  return getSubCategoriesQuery;
};

export default useGetSubCat;
