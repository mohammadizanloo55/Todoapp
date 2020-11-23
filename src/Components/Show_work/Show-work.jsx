import { PureComponent } from "react";
import Work_list from "./work-list/Work_list";
import Done_list from "./Done-list/Done-list";
import Done_or_Work from "./Done_or_Work/Done_or_Work"
class Show_work extends PureComponent {
  state = {
    active: true,
  };

  clicked = () => {
    if (this.state.active) {
      this.setState({
        active: false,
      });
      
    } else {
      this.setState({
        active: true,
      });
      
    }
  };
  render() {
    const { active } = this.state;
    const { Todos, sendthis, Dones } = this.props;

    return (
      <div className="mt-4 px-0 container d-flex justify-content-center ">
        <div className="row px-1 d-flex col-12 col-md-7  ">
          <div className="col-12 d-flex px-0  ">
            <ul className="nav nav-tabs">
              <li className="nav-item ">
                <b
                  onClick={this.clicked}
                  className={`d-flex  align-items-center  nav-link ${
                    active ? "active" : null
                  }`}
                  href="#"
                >
                  undone
                  <span className="badge ml-2 badge-danger">
                    {Todos.length}
                  </span>
                </b>
              </li>
              <li className="nav-item">
                <b
                  onClick={this.clicked}
                  className={`nav-link ${active ? null : "active"}`}
                  href="#"
                >
                  done
                  <span className="badge ml-2 badge-success">
                    {Dones.length}
                  </span>
                </b>
              </li>
            </ul>
          </div>

          {active
            ? Todos.map((item, index) => {
                
                return (
                  <Done_or_Work
                    sendthis={sendthis}
                    key={index}
                    number={index}
                    Todos={Todos}
                    Dones={sendthis().state.Dones}
                    Todos_or_Dones={active}
                  />
                );
              })
            : Dones.map((item, index) => {
              
             return <Done_or_Work
                  sendthis={sendthis}
                  key={index}
                  number={index}
                  Todos={Todos}
                  Dones={sendthis().state.Dones}
                  Todos_or_Dones={active}
                />;
              })}
        </div>
      </div>
    );
  }
}
export default Show_work;
