import {
  Box,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { animations } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, getData } from "../redux/action";
import { Task } from "./Task";
import { TaskUpdater } from "./TaskUpdater";

export const Todo = () => {
  const { task } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };
  return (
    <Box>
      <Box textAlign="center" fontSize="3rem" fontWeight="extrabold">
        Todolist
      </Box>
      <hr style={{ margin: "1em", border: "1px solid black" }} />
      <Flex justifyContent="space-around">
        <Task />
        <Select w="20%">
          <option value="">All</option>
          <option value="">Completed</option>
          <option value="">Incomplete</option>
        </Select>
      </Flex>
      {!task ? (
        <Card p="1rem" m="1rem" fontSize="2rem">
          You have no task
        </Card>
      ) : (
        <SimpleGrid m="1rem" spacing="5%" columns={[1, 2, 4]}>
          {task.map((item) => (
            <Card key={item.id} bg="lightsteelblue" p="1rem">
              <CardHeader>
                <Flex justifyContent="space-between">
                  <Heading size="md">{item.taskName}</Heading>

                  <Box onClick={() => !item.status}>
                    {item.priority === "Low Priority" ? (
                      <Box
                        h="1.5rem"
                        w="1.5rem"
                        border="1px solid black"
                        borderRadius="50%"
                        bg="green"
                      ></Box>
                    ) : (
                      <Box
                        h="1.5rem"
                        w="1.5rem"
                        border="1px solid black"
                        borderRadius="100%"
                        bg="red"
                      ></Box>
                    )}
                  </Box>
                </Flex>
              </CardHeader>
              <CardFooter display="flex" justifyContent="space-around">
                <Button
                  _hover={{ color: "white", bg: "red" }}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
                <TaskUpdater id={item.id} />
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
