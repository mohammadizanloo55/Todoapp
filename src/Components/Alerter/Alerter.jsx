import {PureComponent} from "react"
class Alert extends PureComponent {
  render() {
    return (
      <div className="col-12 text-center position-absolute alert alert-danger">
      {this.props.text}
      </div>
    );
  }
}
export default Alert