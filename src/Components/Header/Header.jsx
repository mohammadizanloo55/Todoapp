import { PureComponent } from "react";
class Header extends PureComponent {
  render() {
    return (
      <div className="container-fluid p-0">
        <nav className="navbar bg-dark col-12 d-flex justify-content-center row mx-0 navbar-dark">
          <div className="col-12 col-md-6 text-white h3">TODOAPP</div>
        </nav>
      </div>
    );
  }
}
export default Header;
