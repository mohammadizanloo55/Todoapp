import "./App.scss";
//? librarys
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
//? Components
import Header from "./Components/Header/Header";
import Helper from "./Components/Helper/Helper";
import LIST_WORK from "./Components/List_work/List-work";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
//? hook
import { useReducer } from "react";
//? Context and Reducer
import TodoReducer from "./Reducers/TodoReducer/TodoReducer";
import LoginReducer from "./Reducers/LoginReducer/LoginReducer";
import TodoContext from "./Contexts/TodoContext/TodoContext";
import LoginContext from "./Contexts/LoginContext/LoginContext";
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
