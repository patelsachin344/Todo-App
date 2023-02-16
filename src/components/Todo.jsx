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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, getData } from "../redux/action";
import { Task } from "./Task";
import { TaskUpdater } from "./TaskUpdater";

export const Todo = () => {
  const { task, err } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };
  console.log(err);
  return (
    <Box border="1px solid red">
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
      {!task.length ? (
        <Card p="1rem" m="1rem" fontSize="2rem" textAlign="center">
          You have no task
        </Card>
      ) : (
        <SimpleGrid m="1rem" spacing="5%" columns={[1, 2, 3]}>
          {task.map((item) => (
            <Card key={item._id} bg="lightsteelblue" p="1rem">
              <CardHeader>
                <Flex justifyContent="space-between">
                  <Heading size="md">{item.taskName}</Heading>
                  <Box>Timer</Box>
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
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
                <TaskUpdater id={item._id} />
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
