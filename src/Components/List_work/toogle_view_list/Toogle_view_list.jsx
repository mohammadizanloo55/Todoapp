import { useContext } from "react";
import List_Work_Context from "./../../../Contexts/List_work_Context/List_work_Context";

function Toogle_view_list(param) {
  const listcontext = useContext(List_Work_Context);

  const { Show_undone } = listcontext.state;

  const toogle_view_list = () => {
    const setState = listcontext.setState;
    const state = listcontext.state;

    setState({
      ...state,
      Show_undone: !Show_undone,
    });
  };

  let { dones, undones } = listcontext;

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item ">
        <b
          onClick={toogle_view_list}
          className={`d-flex  align-items-center nav-link${
            Show_undone ? " active" : ""
          }`}
        >
          undone
          <span className="badge ml-2 badge-danger"> {undones.length} </span>
        </b>
      </li>
      <li className="nav-item">
        <b
          onClick={toogle_view_list}
          className={`d-flex  align-items-center nav-link${
            Show_undone ? "" : " active"
          }`}
        >
          done
          <span className="badge ml-2 badge-success">{dones.length}</span>
        </b>
      </li>
    </ul>
  );
}
export default Toogle_view_list;
