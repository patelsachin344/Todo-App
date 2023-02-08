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
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export const Task = ({ handleAdd }) => {
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("incomplet");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handler = () => {
    handleAdd(taskName, status);
    onClose();
  };
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <Box>
      <Button onClick={onOpen}>Add Todo</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Task</ModalHeader>
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
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="false">Incomplete</option>
              <option value="true">Completed</option>
            </Select>
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
