import { useContext } from "react";
import TodoContext from "./../../Contexts/TodoContext/TodoContext";
function Header() {
  let todocontext = useContext(TodoContext);

  let logout = () => {
    todocontext.Tododispatch({ type: "clean_Todo" });
    todocontext.Logindispatch({ type: "logout" });
  };

  return (
    <div className="container-fluid p-0">
      <nav className="navbar bg-dark px-0 col-12 d-flex justify-content-center rw mx-0 navbar-dark">
        <div
          onClick={logout}
          className="col-12 col-md-6 text-white d-flex justify-content-between juc px-0 h3"
        >
          <span className=""> TODOAPP </span>
          <button className="btn-danger btn"> logout</button>
        </div>
      </nav>
    </div>
  );
}
export default Header;
