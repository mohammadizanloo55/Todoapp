function TodoReducer(state, action) {
  switch (action.type) {
    case "toogle_view_list": {
      return toogle_view_list(state);
    }
    case "formsubmited": {
      return formsubmited(state, action);
    }
    case "updateTodo": {
      return updateTodo(state, action);
    }
    case "clean_Todo": {
      return clean_Todo(state);
    }
    case "changeTodo": {
      return changeTodo(state);
    }
    case "deleteTodo": {
      return deleteTodo(state, action);
    }
    default: {
      throw Error("your type is invalid");
    }
  }
}

let toogle_view_list = (state) => {
  return {
    ...state,
    active: !state.active,
  };
};
let formsubmited = (state, action) => {
  let { newTodos } = action.payload;

  return {
    ...state,
    Todos: newTodos,
  };
};
let clean_Todo = (state) => {
  return {
    ...state,
    Todos: [],
  };
};
let updateTodo = (state, action) => {
  let { newTodos } = action.payload;
  let Todos =
    newTodos.Todos === undefined || newTodos.Todos === null
      ? []
      : newTodos.Todos;
  return {
    ...state,
    Todos,
  };
};
let changeTodo = (state) => {
  return {
    ...state,
  };
};
let deleteTodo = (state, action) => {
  let todosfiltered = state.Todos.filter((item) => {
    if (!item.remove) {
      return true;
    }
    return false;
  });

  return {
    ...state,
    Todos: todosfiltered,
  };
};

export default TodoReducer;
