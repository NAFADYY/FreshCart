import axios from "axios";
import { useQuery } from "react-query";

const getAllProducts = () => {
  return axios.get("https://ecommerce.routemisr.com/api/v1/products");
};

export const GetProducts = () => {
  return useQuery({
    queryKey: ["getProducts"],
    queryFn: getAllProducts,
  });
};
