import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { productsAxios } from "../config/axiosProducts";

const ProductsPage = () => {
  const [productList, setProductList] = useState([]);
  console.log("productList: ", productList.data);

  useEffect(() => {
    productsAxios
      .get("/products?populate=thumbnail,category")
      .then((res) => setProductList(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gap={6}
      m={30}
    >
      {productList?.data?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  );
};

export default ProductsPage;
