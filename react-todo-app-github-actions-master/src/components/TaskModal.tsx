import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";

interface TaskModalProps {
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal = ({ isOpen, onClose, isEdit }: TaskModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalHeader>
              {isEdit ? "Update Your Task" : "Add Your Task"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Your task title..." />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Status</FormLabel>
                <Select>
                  <option value="">Select an option</option>
                  <option value="completed">completed</option>
                  <option value="incomplete">ncomplete</option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                {isEdit ? "Update" : "Save"}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskModal;
