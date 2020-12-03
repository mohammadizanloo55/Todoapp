//? librarys
import axios from "./../../AxiosConfig/AxiosConfig";
import loadable from "@loadable/component";
//? hooks
import { useState, useContext } from "react";
//? Context
import TodoContext from "../../Contexts/TodoContext/TodoContext";
//? Component

const Alerter = loadable(() => {
  return import("../Alerter/Alerter");
});
function Helper() {
  const Todocontext = useContext(TodoContext);
  // const logincontext = useContext(LoginContext);
  const [state, setstate] = useState({
    IsErr: false,
    Errtext: "",
    inputvalue: "",
  });
  let { inputvalue } = state;

  let newTodos = Todocontext.Todos.concat([
    {
      text: inputvalue,
      id: Math.floor(Math.random() * Date.now()),
      IsDone: false,
    },
  ]);
  function formsubmited(e) {
    e.preventDefault();

    if (inputvalue === "") {
      setstate({
        IsErr: true,
        inputvalue: "",
        Errtext: "please insert valid value in input",
      });
    } else {
      let { email, Password, firebasehash } = Todocontext;

      axios
        .put(`/users/${email}/${firebasehash}.json`, {
          gmail: email,
          password: Password,
          Todos: newTodos,
        })
        .then((e) => {
          setstate({
            inputvalue: "",
            IsErr: false,
          });
          Todocontext.Tododispatch({
            type: "formsubmited",
            payload: {
              newTodos,
            },
          });
        })
        .catch((err) => {
          setstate({
            inputvalue: "",
            Errtext: `error for updata data ${err}`,
            IsErr: true,
          });
        });
    }
  }
  function inputchanged(e) {
    setstate({
      inputvalue: e.target.value,
    });
  }
  const { IsErr } = state;
  return (
    <div>
      {IsErr ? <Alerter text="please insert valid value in input" /> : null}
      <div className="jumbotron">
        <h1 className="text-center"> Welcome! </h1>
        <p className="text-muted text-center h5">
          To get started, add some items to your list:
        </p>
        <form
          className="mt-4 row d-flex justify-content-center"
          onSubmit={formsubmited}
        >
          <div className="form-group d-flex">
            <input
              onChange={inputchanged}
              className="form-control"
              placeholder="i wnat to do ..."
              value={state.inputvalue}
            />
            <button className="ml-2 ml-sm-3 btn btn-primary" type="submit">
              add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Helper;
