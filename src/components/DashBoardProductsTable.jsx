import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useAddDashboardProductsMutation,
  useDeleteDashboardProductsMutation,
  useGetDashboardProductsQuery,
  useUpdateDashboardProductsMutation,
} from "../app/services/apiSlice";
import DashBoardProductsTableSkeleton from "./DashBoardProductsTableSkeleton";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import AlertDialog from "../shared/AlertDialog";
import { useEffect, useState } from "react";
import CustomModel from "../shared/Model";
import { useSelector } from "react-redux";
import { selectNetwork } from "../app/features/networkSlice";

const DashBoardProductsTable = () => {
  const { isOnLine } = useSelector(selectNetwork);
  const [clickedProductId, setClickedProductId] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const { isLoading, data } = useGetDashboardProductsQuery({ page: 5 });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModelOpen,
    onOpen: onModelOpen,
    onClose: onModelClose,
  } = useDisclosure();

  const {
    isOpen: isAddModelOpen,
    onOpen: onAddModelOpen,
    onClose: onAddModelClose,
  } = useDisclosure();

  const [destroyProduct, { isLoading: isDestroy, isSuccess }] =
    useDeleteDashboardProductsMutation();

  const [addProduct, { isLoading: isAdding, isSuccess: isAdded }] =
    useAddDashboardProductsMutation();

  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdatingSuccess },
  ] = useUpdateDashboardProductsMutation();

  useEffect(() => {
    if (isSuccess) {
      setClickedProductId(null);
      onClose();
    }
  }, [isSuccess, onClose]);

  useEffect(() => {
    if (isUpdatingSuccess) {
      onModelClose();
    }
  }, [isUpdatingSuccess, onModelClose]);

  useEffect(() => {
    if (isAdded) {
      onAddModelClose();
    }
  }, [isAdded, onAddModelClose]);

  const onChangeHandler = (e) => {
    setProductToEdit({ ...productToEdit, [e.target.name]: e.target.value });
  };

  const onChangeNewProductHandler = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const onChangePriceHandler = (value) => {
    setProductToEdit({ ...productToEdit, price: +value });
  };

  const onChangeNewPriceHandler = (value) => {
    setNewProduct({ ...newProduct, price: +value });
  };

  const onChangeStockHandler = (value) => {
    setProductToEdit({ ...productToEdit, stock: +value });
  };

  const onChangeNewStockHandler = (value) => {
    setNewProduct({ ...newProduct, stock: +value });
  };

  const onSubmitHandler = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToEdit.title,
        price: productToEdit.price,
        stock: productToEdit.stock,
        description: productToEdit.description,
      })
    );
    formData.append("files.thumbnail", thumbnail);
    updateProduct({ id: clickedProductId, body: formData });
  };

  const onSubmitAddHandler = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: newProduct.title,
        price: newProduct.price,
        stock: newProduct.stock,
        description: newProduct.description,
      })
    );
    formData.append("files.thumbnail", thumbnail);
    addProduct(formData);
  };

  const onChangeThumbnailHandler = (e) => {
    setThumbnail(e.target.files[0]);
  };

  if (isLoading || !isOnLine) {
    return <DashBoardProductsTableSkeleton />;
  }

  return (
    <>
      <Button colorScheme="green" my="5" onClick={onAddModelOpen}>
        Add New Product
      </Button>
      <TableContainer>
        <Table variant="striped" colorScheme="purple">
          <TableCaption>Total Entries {data?.data?.length}</TableCaption>
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
            {data?.data?.map((product) => (
              <Tr key={product.id}>
                <Td>{product?.id}</Td>
                <Td>{product?.attributes?.title}</Td>
                <Td>
                  <Image
                    borderRadius="full"
                    objectFit="cover"
                    boxSize="40px"
                    src={`${product?.attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url}`}
                    alt={product?.attributes?.title}
                  />
                </Td>
                <Td>$ {product?.attributes?.price}</Td>
                <Td>{product?.attributes?.stock}</Td>
                <Td>
                  <Button
                    as={Link}
                    to={`/products/${product.id}`}
                    colorScheme="purple"
                    variant="solid"
                    mr={3}
                  >
                    <AiOutlineEye />
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="solid"
                    mr={3}
                    onClick={() => {
                      setClickedProductId(product.id);
                      onOpen();
                    }}
                  >
                    <BsTrash size={17} />
                  </Button>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    mr={3}
                    onClick={() => {
                      onModelOpen();
                      setClickedProductId(product.id);
                      setProductToEdit(product.attributes);
                    }}
                  >
                    <FiEdit size={17} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <AlertDialog
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        title={"Delete Product?"}
        description={"Are you sure you want to delete this product?"}
        cancelText={"Cancel"}
        confirmText={"Delete"}
        isLoading={isDestroy}
        onOkHandler={() => destroyProduct(clickedProductId)}
      />

      <CustomModel
        isOpen={isModelOpen}
        onClose={onModelClose}
        title={"Update Product"}
        cancelTxt={"Cancel"}
        okTxt={"Save"}
        onOkClick={onSubmitHandler}
        isLoading={isUpdating}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Product Title"
            name="title"
            value={productToEdit?.title}
            onChange={onChangeHandler}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            onChange={onChangeHandler}
            value={productToEdit?.description}
          />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            defaultValue={productToEdit?.price}
            onChange={onChangePriceHandler}
            precision={2}
            step={0.2}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Stock</FormLabel>
          <NumberInput
            name="stock"
            defaultValue={productToEdit?.stock}
            onChange={onChangeStockHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            id="thumbnail"
            type="file"
            h={"full"}
            p={2}
            accept="image/png, image/gif, image/jpeg"
            onChange={onChangeThumbnailHandler}
          />
        </FormControl>
      </CustomModel>

      <CustomModel
        isOpen={isAddModelOpen}
        onClose={onAddModelClose}
        title={"Add New Product"}
        cancelTxt={"Cancel"}
        okTxt={"Add"}
        onOkClick={onSubmitAddHandler}
        isLoading={isAdding}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Product Title"
            name="title"
            value={newProduct?.title}
            onChange={onChangeNewProductHandler}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            onChange={onChangeNewProductHandler}
            value={newProduct?.description}
          />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            defaultValue={newProduct?.price}
            onChange={onChangeNewPriceHandler}
            precision={2}
            step={0.2}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Stock</FormLabel>
          <NumberInput
            name="stock"
            defaultValue={newProduct?.stock}
            onChange={onChangeNewStockHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            id="thumbnail"
            type="file"
            h={"full"}
            p={2}
            accept="image/png, image/gif, image/jpeg"
            onChange={onChangeThumbnailHandler}
          />
        </FormControl>
      </CustomModel>
    </>
  );
};

export default DashBoardProductsTable;
