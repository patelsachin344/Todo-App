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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataOne, updateData } from "../redux/action";

let initialData = {
  taskName: "",
  status: "",
  priority: "",
};

export const TaskUpdater = ({ id }) => {
  const [dataId, setDataID] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let dispatch = useDispatch();
  const { oneTask } = useSelector((state) => state);
  const [todo, setTodo] = useState(initialData);
  const { taskName, status, priority } = todo;

  useEffect(() => {
    if (dataId) {
      dispatch(getDataOne(dataId));
    }
  }, [dataId]);

  useEffect(() => {
    setTodo(oneTask);
  }, [oneTask]);

  console.log(oneTask, dataId);

  console.log(todo, "todoooooooooooo");

  const handleIDOpen = () => {
    if (id) {
      setDataID(id);
    }
    onOpen();
  };

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleChange = (e) => {
    let { value, name } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handler = () => {
    dispatch(updateData(todo, dataId));
    onClose();
  };
  return (
    <Box>
      <Button _hover={{ bg: "green", color: "white" }} onClick={handleIDOpen}>
        Edit
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg="lightcoral">
          <ModalHeader>Edit your Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb="1.5rem">
              <FormLabel>Task Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Update Task Name"
                name="taskName"
                value={taskName || ""}
                onChange={handleChange}
              />
            </FormControl>
            <HStack spacing="5px">
              <Select
                name="status"
                value={status || ""}
                onChange={handleChange}
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Completed">Completed</option>
              </Select>
              <Select
                name="priority"
                value={priority || ""}
                onChange={handleChange}
              >
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
