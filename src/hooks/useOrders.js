import axios from "axios";
import { useQuery } from "react-query";
import { jwtDecode } from "jwt-decode";
export const CheckOut = async (values, cartId, userToken) => {
  let result;
  CreateCashOrder(values, cartId, userToken);
  await axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://abdullahshabaan.github.io/FreshCart`,
      {
        shippingAddress: values,
      },
      {
        headers: {
          token: userToken,
        },
      }
    )
    .then((response) => {
      result = response.data.session.url;
    })
    .catch((err) => {
      console.log(err);
    });
  return await result;
};
const CreateCashOrder = (values, cartId, userToken) => {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        shippingAddress: values,
      },
      {
        headers: {
          token: userToken,
        },
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchUserOrders = () => {
  const token = localStorage.getItem("userToken");
  const decodedToken = jwtDecode(token);
  return axios(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`
  );
};

export const GetUserOrders = () => {
  return useQuery({
    queryKey: ["getUserOrders"],
    queryFn: fetchUserOrders,
  });
};
