//? library
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import sha256 from "crypto-js/sha256";

//? hooks
import { useState, useContext } from "react";
//? Components
import Alerter from "../Alerter/Alerter";
//?Contexts
import LoginContext from "../../Contexts/LoginContext/LoginContext";

function Signup() {
  let [state, setState] = useState({
    Email_inputvalue: "",
    Password_inputvalue: "",
    Email_Isinvalid: false,
    Password_Isinvalid: false,
    Iserr: false,
    Emailischanged: false,
    Passwordchanged: false,
    errtext: "",
  });

  let loginContext = useContext(LoginContext);
  let EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let GreatpasswordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

  let Email_change = (e) => {
    if (EmailRegex.test(e.target.value)) {
      setState({
        ...state,
        Email_Isinvalid: false,
        Email_inputvalue: e.target.value,
        Emailischanged: true,
        Iserr:false
      });
    } else {
      setState({
        ...state,
        Email_Isinvalid: true,
        Email_inputvalue: e.target.value,
        Emailischanged: true,
        Iserr:false
      });
    }
  };
  let Password_change = (e) => {
    if (GreatpasswordRegex.test(e.target.value)) {
      setState({
        ...state,
        Iserr: false,
        Password_Isinvalid: false,
        Password_inputvalue: e.target.value,
        Passwordchanged: true,
      });
    } else {
      setState({
        ...state,
        Iserr: false,
        Password_Isinvalid: true,
        Password_inputvalue: e.target.value,
        Passwordchanged: true,
      });
    }
  };
  let Form_submited = (e) => {
    e.preventDefault();

    if (!EmailRegex.test(Email_inputvalue)) {
      setState({
        ...state,
        Iserr: true,
        errtext: "your Email was wrong",
      });
      return null;
    }
    if (!GreatpasswordRegex.test(Password_inputvalue)) {
      setState({
        ...state,
        Iserr: true,
        errtext: "your password is not safe",
      });
      return null;
    }
    let gmailhash = sha256(Email_inputvalue.trim()).toString().trim();
    let passwordhash = sha256(Password_inputvalue.trim()).toString().trim();
    axios
      .get(`https://todoapp-3d9bf.firebaseio.com/users/${gmailhash}/.json`)
      .then((DB) => {
        if (DB.data === null) {
          axios
            .post(
              `https://todoapp-3d9bf.firebaseio.com/users/${gmailhash}/.json`,
              {
                gmail: gmailhash,
                password: passwordhash,
                Todos: [],
              }
            )
            .then((e) => {
              setState({
                ...state,
                Iserr: false,
                errtext: "",
                Email_inputvalue: "",
                Password_inputvalue: "",
              });
              loginContext.Logindispatch({
                type: "Signup_Submit",
                payload: {
                  email: gmailhash,
                  Password: passwordhash,
                  firebasehash: e.data.name,
                },
              });
            })
            .catch((err) => {
              setState({
                ...state,
                Iserr: true,
                errtext: `There was a problem sending the data ${err}`,
                Email_inputvalue: "",
                Password_inputvalue: "",
              });
            });
        } else {
          setState({
            ...state,
            Iserr: true,
            errtext: "You are already registered",
          });
        }
      })
      .catch((err) => {
        setState({
          ...state,
          Iserr: true,
          errtext: `There was a problem receiving the data ${err}`,
          Email_inputvalue: "",
          Password_inputvalue: "",
        });
      });
  };

  let {
    Email_inputvalue,
    Password_inputvalue,
    Iserr,
    errtext,
    Email_Isinvalid,
    Password_Isinvalid,
    Passwordchanged,
    Emailischanged,
  } = state;

  return (
    <div className="row mx-0 d-flex justify-content-center align-items-center min-vh-100">
      {Iserr ? <Alerter text={errtext} /> : null}
      <div className="card col-12 px-0 col-sm-10 col-md-6 col-lg-5 col-xl-4">
        <div className="card-header">
          <h1 className="card-title"> Signup </h1>
        </div>
        <form onSubmit={Form_submited}>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="inputEmail">Email address</label>
              <input
                type="email"
                className={`form-control ${
                  Emailischanged
                    ? Email_Isinvalid
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="inputEmail"
                placeholder="Enter email"
                value={Email_inputvalue}
                onChange={Email_change}
              />
              <small id="emailHelp" className="form-text text-muted">
                Please enter your username
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword"> Password </label>
              <input
                type="Password"
                className={`form-control 
                ${
                  Passwordchanged
                    ? Password_Isinvalid
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="inputPassword"
                placeholder="Enter Password"
                value={Password_inputvalue}
                onChange={Password_change}
              />
              <small id="emailHelp" className="form-text text-muted">
                Please enter Password
              </small>
            </div>
          </div>
          <div className="card-footer row mx-0 ">
            <button
              className="btn-block card-link btn btn-success"
              type="submit"
            >
              Signup
            </button>
            <Link
              to="/Login"
              className="card-link col-12 mx-0  mt-4 text-center "
            >
              i have accont | Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
