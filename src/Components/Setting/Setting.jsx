import "./Setting.scss";
import TodoContext from "./../../Contexts/TodoContext/TodoContext";
import { useContext, useState } from "react";
import axios from "./../../AxiosConfig/AxiosConfig";
import sha256 from "crypto-js/sha256";
import loadable from "@loadable/component";
const Alerter = loadable(() => {
  return import("./../Alerter/Alerter");
});
function Setting() {
  let [state, setState] = useState({
    showform: false,
    changepasswordinput: "",
    isErr: false,
    Errtext: "",
  });
  let GreatpasswordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

  let todocontext = useContext(TodoContext);
  let settingtoggler = () => {
    todocontext.Logindispatch({ type: "tooglesetting" });
  };
  let themetoogle = () => {
    // Storage
  };
  let deleteaccount = () => {
    console.log(todocontext);
    let { email } = todocontext;
    axios
      .delete(`/users/${email}.json`)
      .then((data) => {
        todocontext.Logindispatch({ type: "tooglesetting" });
        todocontext.Tododispatch({ type: "clean_Todo" });
        todocontext.Logindispatch({ type: "logout" });
        localStorage.email = undefined;
      })
      .catch((err) => {
        alert(err);
      });
  };
  let passwordchanger = () => {
    setState({
      ...state,
      showform: !state.showform,
    });
  };
  let inputchanged = (e) => {
    if (!GreatpasswordRegex.test(e.target.value)) {
      setState({
        ...state,
        isErr: true,
        changepasswordinput: e.target.value,

        Errtext: `your password is not safe 
        Your password must be (# $) and it must contain uppercase and lowercase numbers and letters And be more than 8 letters`,
      });
      return;
    }
    setState({
      ...state,
      changepasswordinput: e.target.value,
      isErr: false,
      Errtext: "",
    });
    console.log(e.target.value);
  };
  console.log(localStorage.Password);

  let passwordchangersubmit = (e) => {
    e.preventDefault();
    if (!GreatpasswordRegex.test(state.changepasswordinput)) {
      setState({
        ...state,
        isErr: true,
        Errtext: `your password is not safe 
        Your password must be (# $) and it must contain uppercase and lowercase numbers and letters And be more than 8 letters`,
      });
      return;
    }
    let { Todos, email, firebasehash, Password } = todocontext;
    let newPassword  = sha256(state.changepasswordinput).toString()
    if(Password === newPassword) {
      return ;
    }
    axios
      .put(`/users/${email}/${firebasehash}.json`, {
        gmail: email,
        Todos,
        password: newPassword,
      })
      .then((data) => {
        console.log(data);
        localStorage.Password = newPassword;
        setState({
          ...state,
          isErr: false,
          Errtext: "",
        });
        cancelpasswordchage()
      });
  };
  let cancelpasswordchage = () => {
    setState({
      showform: false,
      changepasswordinput: "",
    });
  };

  return (
    <div className="row m-0 px-0 Setting d-flex align-items-center justify-content-center  position-absolute bg-blur h-100 w-100">
      {state.isErr ? <Alerter text={state.Errtext} /> : null}
      <div className="card col-12 px-0 col-sm-10 col-md-6 col-lg-5 col-xl-4 px-0">
        <div className="card-header  d-flex  justify-content-between">
          <h1 className="mb-0 text-center card-title w-100 "> Setting </h1>

          <button
            onClick={settingtoggler}
            className="bg-white border-0 h1 p-0 text-right m-0"
          >
            &times;
          </button>
        </div>
        <div className="card-body d-flex flex-column  px-0 pl-2">
          {state.showform ? (
            <form className="mx-2" onSubmit={passwordchangersubmit}>
              <input
                placeholder="Please enter your password"
                onChange={inputchanged}
                type="Password"
                value={state.changepasswordinput}
                className="form-control"
              />

              <div className="d-flex justify-content-center">
                <button type="submit" className="mx-2 mt-4 btn btn-success">
                  change my password
                </button>
                <button
                  type="button"
                  onClick={cancelpasswordchage}
                  className="btn btn-danger  mt-4"
                >
                  cancell
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="mb-3 d-flex  align-items-center">
                <p className="m-0 mx-3"> color theme : </p>
                <button className="btn btn-dark" onClick={themetoogle}>
                  dark theme
                </button>
              </div>
              <div className="mb-3 d-flex flex-row align-items-center">
                <p className="m-0 mx-3"> change password : </p>
                <button
                  onClick={passwordchanger}
                  className="btn  btn-danger px-0 px-sm-2"
                >
                  change password
                </button>
              </div>

              <div className="mb-3 d-flex  align-items-center">
                <p className="m-0 mx-3"> delete account </p>
                <button onClick={deleteaccount} className="btn btn-danger">
                  delete account
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Setting;
