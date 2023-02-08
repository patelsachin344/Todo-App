import { AddTask, Err, GetTask, RemoveTask, UpdatedTask } from "./action";

const intitial = {
  task: [],
  error: false,
};
export const reducer = (state = intitial, action) => {
  switch (action.type) {
    case GetTask: {
      return {
        task: action.payload,
        error: false,
      };
    }
    case Err: {
      return {
        error: true,
        task: [],
      };
    }
    // case AddTask: {
    //   return {
    //     task: action.payload,
    //   };
    // }
    // case UpdatedTask: {
    //   return {
    //     task: action.payload,
    //   };
    // }
    // case RemoveTask: {
    //   return {};
    // }

    default: {
      return state;
    }
  }
};
