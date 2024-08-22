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
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCard = ({ attributes }) => {
  const { colorMode } = useColorMode();

  // Accessing the thumbnail URL
  const thumbnailUrl = attributes?.thumbnail?.data?.attributes?.url;
  console.log("Thumbnail URL: ", thumbnailUrl);
  console.log(`${import.meta.env.VITE_SERVER_URL}${thumbnailUrl}`);

  return (
    <Card bg={"none"} border={"1px solid #a8b5c8"}>
      <CardBody>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${thumbnailUrl}`}
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
            as={Link}
            to={`/products/${attributes.id}`}
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
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

// Define prop types
ProductCard.propTypes = {
  attributes: PropTypes.shape({
    thumbnail: PropTypes.shape({
      data: PropTypes.shape({
        attributes: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
