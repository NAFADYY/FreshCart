import axios from "axios";
import { useQuery } from "react-query";

const useGetBrands = () => {
  const fetchBrands = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  };

  const getBrands = useQuery({
    queryKey: "getBrands",
    queryFn: fetchBrands,
  });
  return getBrands;
};

export default useGetBrands;
