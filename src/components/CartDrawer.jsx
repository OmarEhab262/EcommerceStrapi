import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  onCloseCartDrawerAction,
  selectGlobal,
} from "../app/features/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { removeAllCart } from "../app/features/cartSlice";

const CartDrawer = () => {
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(onCloseCartDrawerAction());
  };

  const cartProducts = useSelector((state) => state.cart.cartProducts);
  console.log("Cart Products: ", cartProducts);

  return (
    <Drawer placement={"right"} isOpen={isOpenCartDrawer} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Your Shopping Cart</DrawerHeader>
        <DrawerBody>
          {cartProducts.length > 0 ? (
            cartProducts.map((product) => (
              <CartDrawerItem
                key={product.id}
                id={product.id}
                attributes={product.attributes}
                quantity={product.quantity}
              />
            ))
          ) : (
            <Text>Your cart is empty.</Text>
          )}
        </DrawerBody>
        <DrawerFooter>
          {cartProducts.length > 0 && (
            <Button
              variant="outline"
              colorScheme="red"
              onClick={() => dispatch(removeAllCart())}
            >
              Clear All
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
