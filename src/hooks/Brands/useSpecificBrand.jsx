import axios from "axios";
import { useQuery } from "react-query";

const useSpecificBrand = ({ brandId }) => {
  const fetchSpecificBrand = () => {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
    );
  };

  const getBrands = useQuery({
    queryKey: ["getSpecificBrand", brandId],
    queryFn: fetchSpecificBrand,
  });
  return getBrands;
};

export default useSpecificBrand;
