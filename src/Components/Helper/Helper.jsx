import { PureComponent } from "react";
import Alerter from "../Alerter/Alerter";
class Helper extends PureComponent {
  state = {
    isshow: false,
    inputvalue: null,
    value: "",
  };
  btnclick = () => {
    const { sendthis } = this.props;
    const { inputvalue, value } = this.state;
    if (value.trim() === "") {
      this.setState({
        isshow: true,
      });
      return;
    }
    sendthis(inputvalue);
    this.setState({
      isshow: false,
      value: "",
    });
  };

  inputchanged = (e) => {
    this.setState({
      value: e.target.value,
    });
    this.setState({
      inputvalue: [{ text: e.target.value }],
    });
  };

  render() {
    let { isshow } = this.state;
    return (
      <div>
        {isshow ? <Alerter text="please insert valid value in input" /> : null}
        <div className="jumbotron">
          <h1 className="text-center"> Welcome! </h1>
          <p className="text-muted text-center h5">
            To get started, add some items to your list:
          </p>
          <div className="mt-4 row d-flex justify-content-center">
            <div className="form-group d-flex">
              <input
                onChange={this.inputchanged}
                className="form-control"
                placeholder="i wnat to do ..."
                value={this.state.value}
              />
              <button
                onClick={this.btnclick}
                className="ml-2 ml-sm-3 btn btn-primary"
                type="submit"
              >
                add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Helper;
