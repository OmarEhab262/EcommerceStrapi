import { Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import ProductCard from "../components/ProductCard";
import { productsAxios } from "../config/axiosProducts";
import ProductSkeleton from "../components/ProductSkeleton";

const ProductsPage = () => {
  const fetchProducts = async () => {
    const { data } = await productsAxios.get(
      "/products?populate=thumbnail,category"
    );
    return data;
  };

  const {
    data: productList,
    isLoading,
    isError,
    error,
  } = useQuery(["products"], fetchProducts);
  //   console.log(
  //     "products ",
  //     productList?.data[1].attributes.category.data.attributes.title
  //   );

  if (isLoading)
    return (
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={6}
        m={30}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </Grid>
    );

  if (isError) return <div>{error.message}</div>;

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gap={6}
      m={30}
    >
      {productList?.data?.map((product) => (
        <ProductCard key={product.id} {...product} btnName={"View Details"} />
      ))}
    </Grid>
  );
};

export default ProductsPage;
