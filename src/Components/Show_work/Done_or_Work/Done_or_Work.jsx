import { PureComponent } from "react";
class Done_list extends PureComponent {
  state = {
    isshow: false,
    inputvalue: "",
    isinvalid: false,
  };
  isTodofunc = () => {
    if (this.props.Todos_or_Dones) {
      return ["Todos", this.props.Todos, "isdeleted"];
    }
    return ["Dones", this.props.Dones, "isremove"];
  };
  checksetornot() {
    let { number } = this.props;
    let [, props] = this.isTodofunc();
    if (props[number] === null || props[number] === undefined) {
      return "";
    }

    return props[number].text;
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
    let { number } = this.props;

    let { inputvalue } = this.state;
    let [, props] = this.isTodofunc();

    if (inputvalue.trim() !== "") {
      props[number].text = inputvalue;
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
    let { Todos, number, Dones, sendthis } = this.props;
    let [Todos_or_Dones, prop, isdeleted_or_isremove] = this.isTodofunc();
    let removeo_and_fixeddata = (true_or_false) => {
      if (this.props.Todos_or_Dones) {
        Todos[number].isdeleted = true_or_false;
      } else {
        Dones[number].isremove = true_or_false;
      }
    };

    removeo_and_fixeddata(true);
    let filtered = prop.filter(function (el) {
      if (el[isdeleted_or_isremove]) {
        removeo_and_fixeddata(false);
        return false;
      }
      return true;
    });

    sendthis().setState({
      [Todos_or_Dones]: filtered,
    });
    console.log(Todos_or_Dones);
    this.forceUpdate();
  };

  done = () => {
    let upsidedown;
    if (this.props.Todos_or_Dones) {
      upsidedown = ["Dones", this.props.Dones];
    } else {
      upsidedown = ["Todos", this.props.Todos];
    }

    let { number, sendthis } = this.props;
    let prev = upsidedown[1];
    let [, prop] = this.isTodofunc();

    let test = prop[number];

    sendthis().setState({
      [upsidedown[0]]: [...[test], ...prev],
    });

    this.delete();
  };
  render() {
    let { isshow, isinvalid } = this.state;
    let { number ,Todos_or_Dones} = this.props;
    let [, prop,isdeleted_or_isremove] = this.isTodofunc();
    

    if (prop[number][isdeleted_or_isremove]) {
      return null;
    }

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
                    onClick={this.done}
                    className={`btn ${Todos_or_Dones? "btn-success" : "btn-warning"} btn-sm mr-1`}
                  >
                    {Todos_or_Dones? "done" : "undone"}
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
