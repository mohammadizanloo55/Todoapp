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
import Confirm from "./Components/Confirm/Confirm"
const Header = loadable(() => {
  return import("./Components/Header/Header");
});
const Helper = loadable(() => {
  return import("./Components/Helper/Helper");
});
const LIST_WORK = loadable(() => {
  return import("./Components/List_work/List-work");
});
const Login_Signup = loadable(() => {
  return import("./Components/Login_Signup/index");
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
    themeDark: localStorage.darkmodeTodo === "true" ? true : false,
    settingShow: false,
    User : null ,
    Islogout : false,
  });

  let { User_is_ok, settingShow, themeDark } = Loginstate;

  return (
    <div className={`${themeDark ? "dark" : ""}`}>
      <Router>
        <Route path="/">
          {!localStorage.Confirmclosed ?
            <Confirm 
            persiantext={` لطفا اگر در ایران هستید فیلتر شکن خود را روشن کنید `}
            englishtext = {`If you are in Iran, please turn on your VPN`}
            /> : null
          } 
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
            <Login_Signup  status="Login"/>
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
            <Login_Signup status="Signup"/>
          </LoginContext.Provider>
        </Route>
      </Router>
    </div>
  );
}

export default App;
