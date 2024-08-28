import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const CustomModel = ({
  isOpen,
  onClose,
  title,
  okTxt,
  cancelTxt,
  children,
  onOkClick,
  isLoading,
}) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            {cancelTxt}
          </Button>
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={onOkClick}
            isLoading={isLoading}
          >
            {okTxt}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModel;
