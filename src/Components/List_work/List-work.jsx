import { useContext, useState } from "react";
import loadable from "@loadable/component";

import List_work_Context from "../../Contexts/List_work_Context/List_work_Context";
import TOOGLE_VIEW_LIST from "./toogle_view_list/Toogle_view_list";
import TodoContext from "../../Contexts/TodoContext/TodoContext";

const ITEM = loadable(() => {
  return import("./../Item/Item");
});

function List_work(param) {
  let [state, setState] = useState({
    Show_undone: true,
  });
  let Todocontext = useContext(TodoContext);

  let dones = Todocontext.Todos.filter((e) => (e.IsDone ? e : undefined));
  let undones = Todocontext.Todos.filter((e) => (!e.IsDone ? e : undefined));

  let { Show_undone } = state;

  return (
    <List_work_Context.Provider
      value={{
        state,
        setState,
        dones,
        undones,
      }}
    >
      <div className="mt-4 px-0  px-sm-4  container d-flex justify-content-center ">
        <div className="row px-0 d-flex col-12 col-md-7  ">
          <div className="col-12 d-flex px-0  ">
            <TOOGLE_VIEW_LIST />
          </div>
          {Show_undone
            ? undones.map((key, index) => {
                return (
                  <ITEM
                    key={Number(key.id)}
                    index={index}
                    id={Number(key.id)}
                  />
                );
              })
            : dones.map((key, index) => {
                return (
                  <ITEM
                    key={Number(key.id)}
                    id={Number(key.id)}
                    index={index}
                  />
                );
              })}
        </div>
      </div>
    </List_work_Context.Provider>
  );
}

export default List_work;
