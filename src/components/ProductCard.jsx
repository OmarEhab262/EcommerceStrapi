import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const ProductCard = ({ attributes, id, btnName }) => {
  //   const category = attributes?.category?.data?.attributes?.title;
  const { colorMode } = useColorMode();

  // Accessing the thumbnail URL
  const thumbnailUrl = attributes?.thumbnail?.data?.attributes?.url;

  return (
    <Card bg={"none"} border={"1px solid #a8b5c8"}>
      <CardBody>
        <Image
          src={`${thumbnailUrl}`}
          alt={attributes.title || "Product Image"}
          borderRadius="50%"
          w={"200px"}
          h={"200px"}
          mx={"auto"}
          objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"} p={2} rounded={"lg"}>
            {attributes.title}
          </Heading>
          <Text textAlign={"center"} fontSize={"sm"}>
            {attributes.description}
          </Text>
          <Text color="blue.600" fontSize="3xl" textAlign={"center"}>
            $ {attributes.price}
          </Text>

          <Button
            as={btnName === "Add To Cart" ? Button : Link}
            to={`/products/${id}`}
            bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
            size={"xl"}
            variant={"outline"}
            border={"none"}
            py={5}
            overflow={"hidden"}
            w={"full"}
            _hover={{
              bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
              color: colorMode === "light" ? "#e6f3fd" : "#9f7aea",
              border: "transparent",
            }}
            mt={6}
          >
            {btnName}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

// Define prop types
ProductCard.propTypes = {
  btnName: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  attributes: PropTypes.shape({
    thumbnail: PropTypes.shape({
      data: PropTypes.shape({
        attributes: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
    category: PropTypes.shape({
      data: PropTypes.shape({
        attributes: PropTypes.shape({
          title: PropTypes.string,
        }),
      }),
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
