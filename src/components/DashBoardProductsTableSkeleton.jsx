import {
  Flex,
  Skeleton,
  SkeletonCircle,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const DashBoardProductsTableSkeleton = () => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="purple">
        <TableCaption>Loading data...</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Thumbnail</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* Assuming you want 5 skeleton rows */}
          {Array(5)
            .fill("")
            .map((_, index) => (
              <Tr key={index}>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" width="100px" />
                </Td>
                <Td>
                  <SkeletonCircle size="10" />
                </Td>
                <Td>
                  <Skeleton height="20px" width="60px" />
                </Td>
                <Td>
                  <Skeleton height="20px" width="40px" />
                </Td>
                <Td>
                  <Flex gap={3}>
                    <Skeleton height="40px" width="50px" />
                    <Skeleton height="40px" width="50px" />
                    <Skeleton height="40px" width="50px " />
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DashBoardProductsTableSkeleton;
