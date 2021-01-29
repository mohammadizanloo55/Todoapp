import "./Confirm.scss";
import { useState } from "react";
function Confirm(props) {
  let [closedstate, setclosed] = useState({
    Isclosed: false,
  });
  const closeConfirm = () => {
    setclosed({
      Isclosed: true,
    });
    localStorage.Confirmclosed = true;
  };
  return (
    <div
      className={`
    ${closedstate.Isclosed ? "fade" : "zindex_last  "}
    background_opacity position-absolute w-100 h-100
    `}
    >
      <div className="show active position-absolute h-100 w-100 ">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
            </div>
            <div className="modal-body text-center">
              <p> {props.persiantext}</p>
              <p>{props.englishtext}</p>
            </div>

            <div className="d-flex justify-content-center modal-footer">
              <button
                onClick={closeConfirm}
                type="button"
                className="btn btn-secondary"
              >
                ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Confirm;
