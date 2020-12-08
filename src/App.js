//? Import Scss Files
import "./App.scss";
//? hook
import { useReducer } from "react";

//? Librarys
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
const Setting = loadable(() => {
  return import("./Components/Setting/Setting");
});
function App() {
  const [Todostate, Tododispatch] = useReducer(TodoReducer, {
    Todos: [],
  });

  const [Loginstate, Logindispatch] = useReducer(LoginReducer, {
    User_is_ok: false,
    email: null,
    themeisdark: false,
    Password: null,
    firebasehash: "",
    settingShow: false,
  });

  let { User_is_ok, settingShow } = Loginstate;
  
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
            {settingShow ? <Setting /> : null}
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
