import {
  Box,
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
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export const TaskUpdater = ({ todo }) => {
  const [taskName, setTaskName] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handler = () => {
    onClose();
  };

  console.log(todo);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <Box>
      <Button onClick={onOpen}>Edit</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb="1.5rem">
              <FormLabel>Task Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => handler()} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
