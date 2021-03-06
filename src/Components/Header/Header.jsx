import { useContext } from "react";
import { Firebase_Signout } from "./../../firebase/firebase";
import TodoContext from "./../../Contexts/TodoContext/TodoContext";
import gear from "./gear.svg";
function Header() {
  let todocontext = useContext(TodoContext);
  let logout = () => {
    Firebase_Signout().then(() => {
      todocontext.Tododispatch({ type: "clean_Todo" });
      todocontext.Logindispatch({ type: "logout" });
    }).catch(err=>{
      console.error(err)
    });
  };
  let settingtoggler = () => {
    todocontext.Logindispatch({ type: "tooglesetting" });
  };

  return (
    <div className="container-fluid p-0">
      <nav className="navbar bg-dark px-0 col-12 d-flex justify-content-center rw mx-0 navbar-dark">
        <div className="col-12 col-md-6 text-white d-flex justify-content-between  px-0 h3">
          <span className="ml-3"> TODOAPP </span>
          <div>
            <button
              className="btn mx-4 p-0"
              onClick={settingtoggler}
              type="button"
            >
              <img id="gear" src={gear} alt="setting" />
            </button>
            <button onClick={logout} className="btn-danger mr-3 btn">
              logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;
