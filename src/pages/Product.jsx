import { useNavigate, useParams } from "react-router-dom";
import { productsAxios } from "../config/axiosProducts";
import ProductSkeleton from "../components/ProductSkeleton";
import { Button, Flex, Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import ProductCard from "../components/ProductCard";
import { IoMdArrowRoundBack } from "react-icons/io";
const ProductPage = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  // Destructure productId from useParams
  const { productId } = useParams();
  console.log("productId: ", productId);

  const fetchProduct = async () => {
    const { data } = await productsAxios.get(
      `/products/${productId}?populate=thumbnail,category`
    );
    return data;
  };

  // Use the productId as part of the query key
  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useQuery(["product", productId], fetchProduct);

  console.log("Product data:", productData);

  // Loading state
  if (isLoading)
    return (
      <Grid justifyContent="center" alignItems={"center"} m={30}>
        <ProductSkeleton />
      </Grid>
    );

  // Error state
  if (isError) return <div>{error.message}</div>;

  // Destructure product attributes from the response
  const product = productData?.data?.attributes;

  // Render the product card
  return (
    <Flex
      justifyContent="center"
      alignItems={"center"}
      flexDirection={"column"}
      margin={"auto"}
    >
      <Button
        onClick={goBack}
        as={Flex}
        justifyContent="center"
        alignItems={"center"}
        gap={2}
        cursor={"pointer"}
      >
        <IoMdArrowRoundBack />
        goBack
      </Button>
      <Flex justifyContent="center" alignItems={"center"} gap={6} m={30}>
        {product ? (
          <ProductCard
            attributes={product}
            id={productId}
            btnName={"Add To Cart"}
          />
        ) : (
          <div>No product found</div>
        )}
      </Flex>
    </Flex>
  );
};

export default ProductPage;
