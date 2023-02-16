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
import { deleteData, getData } from "../redux/action";
import { Task } from "./Task";
import { TaskUpdater } from "./TaskUpdater";

export const Todo = () => {
  const { task, err } = useSelector((state) => state);
  const [sortStatus, setSortStatus] = useState("");
  const [sortPriority, setSortPriority] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("filter changed");
    dispatch(getData(sortStatus, sortPriority));
  }, [sortStatus, sortPriority]);

  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };
  const handleSortStatus = (e) => {
    let { value } = e.target;
    setSortStatus(value);
  };
  const handleSortPriority = (e) => {
    let { value } = e.target;
    setSortPriority(value);
  };

  return (
    <Box>
      <Box textAlign="center" fontSize="3rem" fontWeight="extrabold">
        Todolist
      </Box>
      <hr style={{ margin: "1em", border: "1px solid black" }} />
      <Flex justifyContent="space-around">
        <Task />
        <Select
          w="20%"
          placeholder="Sort by Status"
          value={sortStatus}
          onChange={handleSortStatus}
        >
          {/* <option value="">All</option> */}
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </Select>
        <Select
          w="20%"
          placeholder="Sort by Priority"
          value={sortPriority}
          onChange={handleSortPriority}
        >
          {/* <option value="">All</option> */}
          <option value="Low Priority">Low Priority</option>
          <option value="High Priority">High Priority</option>
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
                  <Box>
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
