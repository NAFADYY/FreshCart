import { createContext, useEffect, useState } from "react";
import { GetCartProducts } from "../hooks/Cart/useCart";

export const CartCountContext = createContext(null);

const CartCountProvider = ({ children }) => {
  const productsInCart = GetCartProducts();
  const cartCounts = productsInCart?.data?.data.numOfCartItems;
  const [cartNumber, setCartNumber] = useState(0);

  useEffect(() => {
    if (cartCounts) setCartNumber(cartCounts);
  }, [cartCounts]);

  return (
    <CartCountContext.Provider value={{ cartNumber, setCartNumber }}>
      {children}
    </CartCountContext.Provider>
  );
};

export default CartCountProvider;
