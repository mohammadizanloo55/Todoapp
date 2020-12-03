//? scss file
import "./App.scss";
//? hook
import { useReducer } from "react";

//? librarys
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import loadable from "@loadable/component";

//? Context and Reducer
import TodoReducer from "./Reducers/TodoReducer/TodoReducer";
import LoginReducer from "./Reducers/LoginReducer/LoginReducer";
import TodoContext from "./Contexts/TodoContext/TodoContext";
import LoginContext from "./Contexts/LoginContext/LoginContext";

//? Components
const Header = loadable(() => {
  return import("./Components/Header/Header");
});
const Helper = loadable(() => {
  return import("./Components/Helper/Helper");
});
const LIST_WORK = loadable(() => {
  return import("./Components/List_work/List-work");
});
const Login = loadable(() => {
  return import("./Components/Login/Login");
});
const Signup = loadable(() => {
  return import("./Components/Signup/Signup");
});

function App() {
  const [Todostate, Tododispatch] = useReducer(TodoReducer, {
    Todos: [],
  });

  const [Loginstate, Logindispatch] = useReducer(LoginReducer, {
    User_is_ok: false,
    email: null,
    Password: null,
    firebasehash: "",
  });

  let { User_is_ok } = Loginstate;

  return (
    <>
      <Router>
        <Route path="/">
          <Redirect exact to={`${User_is_ok ? "/home" : "/Signup"}`} />
        </Route>
        <Route path="/home">
          <TodoContext.Provider
            value={{
              ...Todostate,
              Tododispatch,
              Logindispatch,
              ...Loginstate,
            }}
          >
            <Header />
            <Helper />
            <LIST_WORK />
          </TodoContext.Provider>
        </Route>
        <Route path="/Login">
          <LoginContext.Provider
            value={{
              Loginstate,
              Logindispatch,
              Tododispatch,
            }}
          >
            <Login />
          </LoginContext.Provider>
        </Route>
        <Route path="/Signup">
          <LoginContext.Provider
            value={{
              Loginstate,
              Logindispatch,
              Tododispatch,
            }}
          >
            <Signup />
          </LoginContext.Provider>
        </Route>
      </Router>
    </>
  );
}

export default App;
