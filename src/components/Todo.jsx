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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/action";
import { Task } from "./Task";
import { TaskUpdater } from "./TaskUpdater";

export const Todo = () => {
  const [todo, setTodo] = useState([]);

  const { error, task } = useSelector((state) => state);
  console.log(task);
  const dispatch = useDispatch();
  let url = "http://localhost:3000/data";
  useEffect(() => {
    dispatch(getData());
  }, []);

  const handleAdd = (taskName, status) => {
    const data = {
      id: new Date() + Math.random(),
      title: taskName,
      status: status,
    };
    setTodo([...todo, data]);
  };

  console.log(todo);
  // const updatedTask = "";
  // const handleEdit = (id) => {
  //   console.log(updatedTask, id);
  // };
  // console.log(updatedTask);
  const handleDelete = (id) => {
    const data = todo.filter((item) => item.id !== id);
    setTodo(data);
  };
  return (
    <Box w="60%" m="auto">
      <Box textAlign="center" fontSize="3rem" fontWeight="extrabold" m="3rem">
        Todolist
      </Box>
      <Flex justifyContent="space-around">
        <Task handleAdd={handleAdd} />
        <Select w="20%">
          <option value="">All</option>
          <option value="">Completed</option>
          <option value="">Incomplete</option>
        </Select>
      </Flex>
      {task.length === 0 ? (
        <Card p="1rem" m="1rem" fontSize="2rem">
          You have no task
        </Card>
      ) : (
        <SimpleGrid
          m="1rem"
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {task.map((item) => (
            <Card key={item.task}>
              <CardHeader>
                <Flex justifyContent="space-between">
                  <Heading size="md">{item.title}</Heading>

                  <Box onClick={() => !item.status}>
                    {item.status === true ? (
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
                <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                <TaskUpdater todo={todo} />
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
