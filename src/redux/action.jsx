export const GetTask = "GetTask";
export const UpdatedTask = "UpdatedTask";
export const AddTask = "AddTask";
export const RemoveTask = "RemoveTask";
export const Err = "Err";

export const addTask = (data) => {
  return {
    type: AddTask,
    payload: data,
  };
};

export const getTask = (data) => {
  return {
    type: GetTask,
    payload: data,
  };
};

export const updatedTask = (id, data) => {
  return {
    type: UpdatedTask,
    payload: data,
  };
};

export const removeTask = (id) => {
  return {
    type: RemoveTask,
  };
};
export const geterr = () => {
  return {};
};

export const getData = () => (dispatch) => {
  dispatch(geterr());
  fetch("http://localhost:4000/data")
    .then((res) => res.json())
    .then((data) => dispatch(getTask(data)))
    .catch((err) => dispatch(geterr(err)));
};
