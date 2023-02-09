import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
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
import { useDispatch } from "react-redux";
import { addData } from "../redux/action";
const initialData = {
  taskName: "",
  status: "",
  priority: "",
};
export const Task = () => {
  const [todo, setTodo] = useState(initialData);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleChange = (e) => {
    let { value, name } = e.target;
    setTodo({ ...todo, [name]: value });
  };
  const { taskName, status, priority } = todo;

  const handler = () => {
    if (!taskName || !status || !priority) {
      alert("Fill The All Input");
    } else {
      dispatch(addData(todo));
      setTodo({
        taskName: "",
        status: "",
        priority: "",
      });
      return onClose();
    }
  };

  return (
    <Box>
      <Button _hover={{ bg: "green" }} bg="skyblue" onClick={onOpen}>
        Add Todo
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg="lightcoral">
          <ModalHeader>Create your Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="1.5rem">
              <FormLabel>Task Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Task Name"
                name="taskName"
                value={taskName}
                onChange={handleChange}
              />
            </FormControl>
            <HStack spacing="5px">
              <Select name="status" value={status} onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="Incomplete">Incomplete</option>
                <option value="Completed">Completed</option>
              </Select>
              <Select name="priority" value={priority} onChange={handleChange}>
                <option value="">Select Priority</option>
                <option value="Low Priority">Low Priority</option>
                <option value="High Priority">High Priority</option>
              </Select>
            </HStack>
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
