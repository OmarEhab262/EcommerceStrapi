import { useNavigate, useParams } from "react-router-dom";
import { productsAxios } from "../config/axiosProducts";
import ProductSkeleton from "../components/ProductSkeleton";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../app/features/cartSlice";

const ProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();

  const fetchProduct = async () => {
    const { data } = await productsAxios.get(
      `/products/${productId}?populate=thumbnail,category`
    );
    return data;
  };

  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useQuery(["product", productId], fetchProduct);

  const goBack = () => navigate(-1);

  const addToCartHandler = () => {
    if (productData) {
      dispatch(addToCart(productData.data)); // Pass product data to cart
    }
  };
  const all = useSelector((state) => state.cart.cartProducts);
  console.log("all: ", all);

  if (isLoading) {
    return (
      <Grid justifyContent="center" alignItems="center" m={30}>
        <ProductSkeleton />
      </Grid>
    );
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (!productData) {
    return <div>Product not found</div>;
  }

  // Destructuring the data object
  const { attributes } = productData.data;
  const { title, description, price, thumbnail } = attributes;

  const thumbnailUrl = thumbnail?.data?.attributes?.url
    ? `${thumbnail.data.attributes.url}`
    : "";

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      margin="auto"
      h={"90vh"}
    >
      <Button
        onClick={goBack}
        as={Flex}
        justifyContent="center"
        alignItems="center"
        gap={2}
        cursor="pointer"
      >
        <IoMdArrowRoundBack />
        Go Back
      </Button>
      <Flex justifyContent="center" alignItems="center" gap={6} m={30}>
        <Card bg="none" border="1px solid #a8b5c8" w={"300px"}>
          <CardBody>
            <Image
              src={thumbnailUrl}
              alt={title || "Product Image"}
              borderRadius="50%"
              w="200px"
              h="200px"
              mx="auto"
              objectFit="cover"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md" textAlign="center" p={2} rounded="lg">
                {title}
              </Heading>
              <Text textAlign="center" fontSize="sm">
                {description}
              </Text>
              <Text color="blue.600" fontSize="3xl" textAlign="center">
                $ {price}
              </Text>

              <Button
                bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
                color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
                size="xl"
                variant="outline"
                border="none"
                py={5}
                overflow="hidden"
                w="full"
                _hover={{
                  bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
                  color: colorMode === "light" ? "#e6f3fd" : "#9f7aea",
                  border: "transparent",
                }}
                mt={6}
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  );
};

export default ProductPage;
