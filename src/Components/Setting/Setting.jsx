import "./Setting.scss";
import TodoContext from "./../../Contexts/TodoContext/TodoContext";
import { useContext } from "react";
import axios from "./../../AxiosConfig/AxiosConfig";
function Setting() {
  let todocontext = useContext(TodoContext);
  let settingtoggler = () => {
    todocontext.Logindispatch({ type: "tooglesetting" });
  };
  let themetoogle = () => {
    let { Todo, email, firebasehash, Password } = todocontext;
    // Storage
  };
  let deleteaccount = () => {
    console.log(todocontext);
    let { email } = todocontext;
    axios.delete(`/users/${email}.json`).then((data) => {
      todocontext.Logindispatch({ type: "tooglesetting" });
      todocontext.Tododispatch({ type: "clean_Todo" });
      todocontext.Logindispatch({ type: "logout" });
      localStorage.email = undefined;
      
    }).catch(err=>{
      alert(err)
    })
  };
  return (
    <div className="row m-0 px-0 Setting d-flex align-items-center justify-content-center  position-absolute bg-blur h-100 w-100">
      <div className="card col-12 px-0 col-sm-10 col-md-6 col-lg-5 col-xl-4 px-0">
        <div className="card-header  d-flex  justify-content-between">
          <h1 className="mb-0 text-center card-title w-100 "> Setting </h1>

          <button onClick={settingtoggler} className="bg-white border-0 h1 p-0 text-right m-0">
            &times;
          </button>
        </div>
        <div className="card-body d-flex flex-column  px-0 pl-2">
          <div className="mb-3 d-flex flex-row align-items-center">
            <p className="m-0 mx-3"> color theme : </p>
            <button className="btn btn-dark" onClick={themetoogle}>
              dark theme
            </button>
          </div>
          <div className="mb-3 d-flex flex-row align-items-center">
            <p className="m-0 mx-3"> delete account </p>
            <button onClick={deleteaccount} className="btn btn-danger">
              {" "}
              delete account{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Setting;
