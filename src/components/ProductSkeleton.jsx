import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="gray.600" rounded="lg" w="300px">
      <SkeletonCircle size="40" mx="auto" />
      <SkeletonText mt="4" w={20} noOfLines={1} spacing="4" mx={"auto"} />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
      <Skeleton
        mt="4"
        h={12}
        noOfLines={1}
        spacing="4"
        mx={"auto"}
        marginTop={"7"}
      />
    </Box>
  );
};

export default ProductSkeleton;
