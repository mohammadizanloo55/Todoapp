import { PureComponent } from "react";
class Done_list extends PureComponent {
  state = {
    isshow: false,
    inputvalue: "",
    isinvalid: false,
  };
  checksetornot() {
    let { Dones, number } = this.props;
    console.log(Dones, number);
    if (Dones[number] === null || Dones[number] === undefined) {
      return "";
    }

    return Dones[number].text;
  }
  edit = () => {
    this.setState({
      isshow: true,
    });
  };

  cancel = () => {
    this.setState({
      isshow: false,
    });
  };
  aplly = () => {
    let { Todos, number } = this.props;
    let { inputvalue } = this.state;

    if (inputvalue.trim() !== "") {
      Todos[number].text = inputvalue;
      this.setState({
        isshow: false,
        isinvalid: false,
        inputvalue: "",
      });
      return;
    }
    this.setState({
      isinvalid: true,
    });
  };
  inputchanged = (e) => {
    this.setState({
      inputvalue: e.target.value,
    });
  };
  delete = () => {
    let { Todos, number, sendthis } = this.props;

    Todos[number].isdeleted = true;

    let filtered = Todos.filter(function (el) {
      if (el.isdeleted) {
        return false;
      }
      return true;
    });
    sendthis().setState({
      Todos: filtered,
    });
  };

  done = () => {
    let { Dones, number, sendthis } = this.props;
    let prev = sendthis().state.Dones;
    let test = Dones[number];

    sendthis().setState({
      Dones: [...[test], ...prev],
    });
    this.delete() 
   
  };
  render() {
    let { isshow, isinvalid } = this.state;
    let { Todos, number } = this.props;
    return (
      <>
        <div className="col-12    px-1  py-3 border-black border bg-light ">
          <div className=" d-flex justify-content-between align-items-center">
            {isshow ? (
              <div className="col px-0 col-6">
                <input
                  className={`px-2 col-12 px-0 form-control ${
                    isinvalid ? "is-invalid" : ""
                  }`}
                  onChange={this.inputchanged}
                />
                <div className="invalid-feedback  ">
                  please insert valid value in input
                </div>
              </div>
            ) : (
              <p className="m-0 ml-2"> {this.checksetornot()} </p>
            )}
            <div className="row px-3">
              {!isshow ? (
                <div className="col px-0">
                  <button
                    onClick={this.undone}
                    className="btn btn-warning btn-sm mr-1"
                  >
                    undone
                  </button>
                  <button
                    onClick={this.edit}
                    className="btn btn-primary btn-sm mr-1"
                  >
                    edit
                  </button>
                  <button
                    onClick={this.delete}
                    className="btn btn-danger btn-sm mr-1"
                  >
                    delete
                  </button>
                </div>
              ) : (
                <div className="col px-0">
                  <button
                    onClick={this.aplly}
                    className="btn btn-primary btn-sm mr-1"
                  >
                    apply
                  </button>
                  <button
                    onClick={this.cancel}
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
}
export default Done_list;
