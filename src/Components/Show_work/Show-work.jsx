import { PureComponent } from "react";
import Work_list from "./work-list/Work_list";
import Done_list from "./Done-list/Done-list";
class Show_work extends PureComponent {
  state = {
    active: true,
  };

  clicked = () => {
    if (this.state.active) {
      this.setState({
        active: false,
      });
      console.log("1");
    } else {
      this.setState({
        active: true,
      });
      console.log("2");
    }
  };
  render() {
    const { active, isdeleted } = this.state;
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
                </b>
              </li>
            </ul>
          </div>

          {active
            ? Todos.map((item, index) => {
                console.log(active);
                return (
                  <Work_list
                    sendthis={sendthis}
                    key={index}
                    number={index}
                    Todos={Todos}
                  />
                );
              })
            : Dones.map((item, index) => {
              
             return <Done_list
                  sendthis={sendthis}
                  key={index}
                  number={index}
                  Todos={Todos}
                  Dones={sendthis().state.Dones}
                />;
              })}
        </div>
      </div>
    );
  }
}
export default Show_work;
