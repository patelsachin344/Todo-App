import {
  AddTask,
  Err,
  GetTask,
  GetTaskOne,
  RemoveTask,
  UpdatedTask,
} from "./action";

const initialState = {
  task: [],
  oneTask: {},
  err: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GetTask: {
      return { ...state, task: action.payload };
    }
    case GetTaskOne: {
      return { ...state, oneTask: action.payload };
    }
    case AddTask:
    case UpdatedTask:
    case RemoveTask:
    case Err: {
      return { ...state, err: action.payload };
    }

    default: {
      return state;
    }
  }
};
