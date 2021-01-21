import "./Setting.scss";
import TodoContext from "./../../Contexts/TodoContext/TodoContext";
import { useContext, useState } from "react";
import loadable from "@loadable/component";
import Passwordcheck from "../Passwordcheck/Passwordcheck";
import {
  Firebase_Delete_Account,
  Firebase_Reset_Password,
} from "./../../firebase/firebase";
const Alerter = loadable(() => {
  return import("./../Alerter/Alerter");
});
const FormPassword = loadable(() => {
  return import("./FormPassword/FormPassword");
});

function Setting() {
  let [state, setState] = useState({
    showform: false,
    changepasswordinput: "",
    Iserr: false,
    Password_Isinvalid: false,
    Errtext: "",
    inputisedited: false,
    textinput: "",
    Isfordeleteaccount: false,
  });

  let todocontext = useContext(TodoContext);
  const settingtoggler = () => {
    todocontext.Logindispatch({ type: "tooglesetting" });
  };
  const themetoogle = () => {
    localStorage.darkmodeTodo = !todocontext.themeDark;
    todocontext.Logindispatch({ type: "toogletheme" });
  };
  const deleteaccount = () => {
    setState({
      ...state,
      textinput: "delete account",
      Isfordeleteaccount: true,
      showform: !state.showform,
    });
  };
  let passwordchanger = () => {
    setState({
      ...state,
      showform: !state.showform,
      textinput: "change password",
      Isfordeleteaccount: false,
    });
  };

  const passwordchangersubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      ...Passwordcheck(
        state.changepasswordinput,
        `your password is not safe 
        Your password must be (# $) and it must contain uppercase and lowercase numbers and letters And be more than 8 letters`
      ),
    });
    let { Password_Isinvalid } = Passwordcheck(state.changepasswordinput);
    if (!Password_Isinvalid) {
      Firebase_Reset_Password(state.changepasswordinput).then(() => {
        setState({
          ...state,
          Iserr: true,
          Errtext: " we send email for reset password ",
        });
        setTimeout(() => {
          setState({
            ...state,
            Iserr: false,
            Errtext: "",
          });
        }, 4000);
      });
    }
  };
  const deleteaccountsubmit = (e) => {
    e.preventDefault();

    Firebase_Delete_Account(state.changepasswordinput)
      .then(() => {
        todocontext.Logindispatch({ type: "tooglesetting" });
        todocontext.Tododispatch({ type: "clean_Todo" });
        todocontext.Logindispatch({ type: "logout" });
      })
      .catch((err) => {
        setState({
          ...state,
          Iserr: true,
          Errtext: err,
        });
      });
  };

  return (
    <div className="row m-0 px-0 Setting d-flex align-items-center justify-content-center  position-absolute bg-blur h-100 w-100">
      {state.Iserr ? <Alerter text={state.Errtext} /> : null}
      <div className="card col-12 px-0 col-sm-10 col-md-6 col-lg-5 col-xl-4 px-0">
        <div className="card-header  d-flex  justify-content-between">
          <h1 className="mb-0 text-center card-title w-100 "> Setting </h1>

          <button
            onClick={settingtoggler}
            className="btn btn-danger px-2  text-right m-0"
          >
            &times;
          </button>
        </div>
        <div className="card-body d-flex flex-column  px-0 pl-2">
          {state.showform ? (
            <FormPassword
              setState={setState}
              state={state}
              passwordsubmit={
                state.Isfordeleteaccount
                  ? deleteaccountsubmit
                  : passwordchangersubmit
              }
            />
          ) : (
            <>
              <div className="mb-3 d-flex  align-items-center">
                <p className="m-0 mx-3"> color theme : </p>
                <button className="btn btn-dark" onClick={themetoogle}>
                  change theme
                </button>
              </div>
              <div className="mb-3 d-flex flex-row align-items-center">
                <p className="m-0 mx-3"> change password : </p>
                <button
                  onClick={passwordchanger}
                  className="btn  btn-primary px-0 px-sm-2"
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
