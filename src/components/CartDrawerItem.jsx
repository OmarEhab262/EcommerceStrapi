import PropTypes from "prop-types";
import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { removeFromCart } from "../app/features/cartSlice";
import { useDispatch } from "react-redux";

const CartDrawerItem = ({ id, attributes, quantity }) => {
  const dispatch = useDispatch();
  const { thumbnail, title, price } = attributes;
  return (
    <Box key={id} mb={4}>
      <Flex alignItems="center" justifyContent={"space-around"} mb={3} py={2}>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${
            thumbnail.data.attributes.url
          }`}
          alt={`Thumbnail of ${title}`}
          w="90px"
          h="90px"
          rounded="full"
          objectFit="cover"
          mr={2}
        />
        <Stack spacing={2}>
          <Text fontSize="sm">{title}</Text>
          <Text fontSize="sm">Price: ${price}</Text>
          <Text fontSize="sm">Quantity: {quantity}</Text>
        </Stack>
      </Flex>
      <Button
        variant="solid"
        colorScheme="red"
        size="sm"
        w={"100%"}
        onClick={() => dispatch(removeFromCart(id))}
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <MdDeleteForever fontSize={"20px"} />
          Remove
        </Box>
      </Button>
    </Box>
  );
};

CartDrawerItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  attributes: PropTypes.shape({
    thumbnail: PropTypes.shape({
      data: PropTypes.shape({
        attributes: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }),
      }),
    }),
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartDrawerItem;
