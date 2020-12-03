//? library
import axios from "axios";
//? hooks
import { useContext, useState } from "react";
//? Context
import TodoContext from "./../../Contexts/TodoContext/TodoContext";
function Item(props) {
  let todocontext = useContext(TodoContext);

  let [state, setState] = useState({
    IseditedClick: false,
    editedinputvalue: "",
    Isvalidinput: false,
  });
  let item = todocontext.Todos.find((Todos) => {
    if (Todos.id === props.id) {
      return true;
    }
    return false;
  });
  let { firebasehash, email } = todocontext;
  let itemindexofall = todocontext.Todos.indexOf(item);
  let { IseditedClick, editedinputvalue, Isvalidinput } = state;
  let Itemtext = item.text;

  let donetoogleClicked = () => {
    axios
      .put(
        `https://todoapp-3d9bf.firebaseio.com/users/${email}/${firebasehash}/Todos/${itemindexofall}/.json`,
        {
          ...item,
          IsDone: !item.IsDone,
        }
      )
      .then(() => {
        item.IsDone = !item.IsDone;
        todocontext.Tododispatch({
          type: "changeTodo",
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  let editClicked = () => {
    setState({
      ...state,
      IseditedClick: true,
      editedinputvalue: item.text,
    });
  };
  let editedinputchanged = (e) => {
    if (e.target.value === "") {
      setState({
        ...state,
        Isvalidinput: false,
        editedinputvalue: e.target.value,
      });
    } else {
      setState({
        ...state,
        editedinputvalue: e.target.value,
        Isvalidinput: true,
      });
    }
  };
  let editesubmited = () => {
    if (editedinputvalue === item.text) {
      setState({
        ...state,
        IseditedClick: false,
        editedinputvalue: item.text,
      });
      todocontext.Tododispatch({
        type: "changeTodo",
      });
      return;
    }
    axios
      .put(
        `https://todoapp-3d9bf.firebaseio.com/users/${email}/${firebasehash}/Todos/${itemindexofall}/.json`,
        {
          ...item,
          text: editedinputvalue,
        }
      )
      .then(() => {
        item.text = editedinputvalue;

        setState({
          ...state,
          IseditedClick: false,
          editedinputvalue: "",
        });
        todocontext.Tododispatch({
          type: "changeTodo",
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  let CancelEdit = () => {
    setState({
      ...state,
      IseditedClick: false,
      editedinputvalue: item.text,
    });
  };
  let deleter = () => {
    item.remove = true;

    let todosfiltered = todocontext.Todos.filter((item) => {
      if (!item.remove) {
        return true;
      }
      return false;
    });
    axios
      .put(
        `https://todoapp-3d9bf.firebaseio.com/users/${email}/${firebasehash}/Todos/.json`,
        {
          ...todosfiltered,
        }
      )
      .then(() => {
        todocontext.Tododispatch({ type: "deleteTodo" });
      });
  };
  return (
    <>
      <div className="col-12  px-1  py-3 border-black border bg-light ">
        <div className=" d-flex justify-content-between align-items-center">
          {IseditedClick ? (
            <div className="col px-0 col-6">
              <input
                className={`px-2 col-12 px-0 form-control ${
                  Isvalidinput ? "is-valid" : "is-invalid"
                }`}
                value={editedinputvalue}
                onChange={editedinputchanged}
              />
              <div className="invalid-feedback  ">
                please insert valid value in input
              </div>
            </div>
          ) : (
            <p className="m-0 ml-2"> {Itemtext} </p>
          )}
          <div className="row mr-1 px-md-4 px-0">
            {!IseditedClick ? (
              <div className="col px-0">
                <button
                  onClick={donetoogleClicked}
                  className={`btn ${
                    item.IsDone ? "btn-warning" : "btn-success"
                  } btn-sm mr-1`}
                >
                  {item.IsDone ? "undone" : "done"}
                </button>
                <button
                  onClick={editClicked}
                  className="btn btn-primary btn-sm mr-1"
                >
                  edit
                </button>
                <button
                  onClick={deleter}
                  className="btn btn-danger btn-sm mr-1"
                >
                  delete
                </button>
              </div>
            ) : (
              <div className="col px-0">
                <button
                  onClick={editesubmited}
                  className="btn btn-primary btn-sm mr-1"
                >
                  apply
                </button>
                <button
                  onClick={CancelEdit}
                  className="btn btn-danger  btn-sm mr-1"
                >
                  cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
