import {
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button as ChakraButton,
  AlertDialog as ChakraAlertDialog,
} from "@chakra-ui/react";
import { useRef } from "react";

const CustomAlertDialog = ({
  onOpen,
  isOpen,
  onClose,
  title,
  description,
  cancelText,
  confirmText,
  onOkHandler,
  isLoading,
}) => {
  const cancelRef = useRef();

  return (
    <>
      <ChakraAlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <ChakraButton ref={cancelRef} onClick={onClose}>
              {cancelText}
            </ChakraButton>
            <ChakraButton
              colorScheme="red"
              ml={3}
              onClick={onOkHandler}
              isLoading={isLoading}
            >
              {confirmText}
            </ChakraButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </ChakraAlertDialog>
    </>
  );
};

export default CustomAlertDialog;
