export const GetTask = "GetTask";
export const GetTaskOne = "GetTaskOne";
export const UpdatedTask = "UpdatedTask";
export const AddTask = "AddTask";
export const RemoveTask = "RemoveTask";
export const Err = "Err";

export const addTask = () => {
  return {
    type: AddTask,
  };
};

export const getTask = (data) => {
  return {
    type: GetTask,
    payload: data,
  };
};
export const getTaskOne = (data) => {
  return {
    type: GetTaskOne,
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
  fetch("http://localhost:4000/data")
    .then((res) => res.json())
    .then((data) => dispatch(getTask(data)))
    .catch((err) => dispatch(geterr(err)));
};

export const getDataOne = (id) => (dispatch) => {
  try {
    fetch(`http://localhost:4000/data/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getTaskOne(data));
      });
  } catch (error) {
    dispatch(geterr(error));
  }
};

export const addData = (body) => (dispatch) => {
  console.log(body, "action");
  try {
    fetch("http://localhost:4000/data", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      dispatch(addTask());
      dispatch(getData());
    });
  } catch (error) {
    dispatch(geterr(error));
  }
};

export const updateData = (body, id) => (dispatch) => {
  try {
    fetch(`http://localhost:4000/data/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      dispatch(updatedTask());
      dispatch(getData());
    });
  } catch (error) {
    dispatch(geterr(error));
  }
};
export const deleteData = (id) => (dispatch) => {
  try {
    fetch(`http://localhost:4000/data/${id}`, {
      method: "DELETE",
    }).then((res) => {
      dispatch(removeTask());
      dispatch(getData());
    });
  } catch (error) {
    dispatch(geterr(error));
  }
};
