import { toast } from "react-toastify";

export const addItemToShoppingCart = (cartItem = {}, shoppingCartItem = []) => {
  const existsItem = shoppingCartItem.find((item) => item.id === cartItem.id);
  if (existsItem) {
    toast.success("Added to shopping cart");
    return shoppingCartItem.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  toast.success("Added to shopping cart");
  return [...shoppingCartItem, { ...cartItem, quantity: 1 }];
};
