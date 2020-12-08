import {PureComponent} from "react"
class Alert extends PureComponent {
  render() {
    return (
      <div className="col-12  text-center fixed-top alert alert-danger">
      {this.props.text}
      </div>
    );
  }
}
export default Alert