import { createContext } from "react";
const TodoContext = createContext({
  Todo: [{ text: String, id: Date.now(), IsDone: Boolean }],
});
export default TodoContext;
