//? hook
import { useState, useEffect, useContext } from "react";
//? library
import loadable from "@loadable/component";
import { Link } from "react-router-dom";
//?context
import LoginContext from "./../../Contexts/LoginContext/LoginContext";

//? Component
import Emailcheck from "./../Emailcheck/Emailcheck";
import Passwordcheck from "./../Passwordcheck/Passwordcheck";
import { Firebase_Login_currentuser } from "./../../firebase/firebase";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
const Alerter = loadable(() => import("./../Alerter/Alerter"));
const Loader = loadable(() => import("./../Loader/Loader"));
function Login_Signup(props) {
  let [state, setState] = useState({
    Email_inputvalue: "",
    Password_inputvalue: "",
    Email_Isinvalid: false,
    Password_Isinvalid: false,
    Inloading: false,
    Iserr: false,
    Email_Is_Changed: false,
    Password_Is_Changed: false,
    errtext: "",
  });
  let logincontext = useContext(LoginContext);
  useEffect(() => {
    if (logincontext.Loginstate.Islogout) {
      return null;
    } else {
      return Firebase_Login_currentuser(state, setState, (user) => {
        if (user !== null) {
          return Login(true, logincontext, state, setState, user);
        }
      });
    }
  }, []);

  const Email_change = (e) => {
    setState({
      ...state,
      Email_inputvalue: e.target.value,
      ...Emailcheck(e.target.value, false),
    });
  };

  const Password_change = (e) => {
    setState({
      ...state,
      Password_inputvalue: e.target.value,
      ...Passwordcheck(e.target.value, false),
    });
  };

  const Form_submited = (e) => {
    e.preventDefault();
    let Email = Emailcheck(
      state.Email_inputvalue,
      true,
      "your Email is not currect"
    );
    let Password = Passwordcheck(
      state.Password_inputvalue,
      true,
      props.status === "Login"
        ? "your password was wrong"
        : `your password is not safe 
    Your password must be more than 6 letters`
    );

    if (Email.Email_Isinvalid) {
      setState({
        ...state,
        ...Email,
      });
      return;
    }
    if (Password.Password_Isinvalid) {
      setState({
        ...state,
        ...Password,
      });
      return;
    }
    setState({
      ...state,
      Inloading: true,
      Email_inputvalue: "",
      Password_inputvalue: "",
    });
    switch (props.status) {
      case "Login": {
        Login(false, logincontext, state, setState);
        break;
      }
      case "Signup": {
        Signup(logincontext, state, setState);
        break;
      }
      default: {
        throw Error("your props is not currect ");
      }
    }
  };

  let {
    Email_inputvalue,
    Password_inputvalue,
    Iserr,
    errtext,
    Email_Isinvalid,
    Password_Isinvalid,
    Password_Is_Changed,
    Email_Is_Changed,
    Inloading,
  } = state;
  if (Inloading) {
    return <Loader />;
  }

  return (
    <div className="bg-Todo row mx-0 d-flex justify-content-center align-items-center min-vh-100">
      {Iserr ? <Alerter text={errtext} /> : null}
      <div className="card  col-12 px-0 col-sm-10 col-md-6 col-lg-5 col-xl-4">
        <div className="card-header">
          <h1 className="card-title"> {props.status} </h1>
        </div>
        <form onSubmit={Form_submited}>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="inputEmail">Email address</label>
              <input
                type="email"
                className={`form-control ${
                  Email_Is_Changed
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
                  Password_Is_Changed
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
              {props.status}
            </button>
            {props.status === "Signup" ? (
              <Link
                to={"/Login"}
                className="card-link col-12 mx-0  mt-4 text-center "
              >
                i have accont | Login
              </Link>
            ) : (
              <Link
                to="/Signup"
                className="card-link col-12 mx-0  mt-4 text-center "
              >
                i dont have accont | Signup
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login_Signup;
