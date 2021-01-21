import Passwordcheck from "../../Passwordcheck/Passwordcheck";

function FormPassword(props) {
  let { setState, state, passwordsubmit } = props;
  const cancelpasswordchage = () => {
    setState({
      showform: false,
      changepasswordinput: "",
    });
  };
  const inputchanged = (e) => {
    setState({
      ...state,
      changepasswordinput: e.target.value,
      inputisedited: true,
      ...Passwordcheck(e.target.value),
    });
  };
  return (
    <form className="mx-2 " onSubmit={passwordsubmit}>
      <input
        placeholder="Please enter your password"
        onChange={inputchanged}
        type="Password"
        value={state.changepasswordinput}
        className={`form-control
         ${
           state.inputisedited
             ? state.Password_Isinvalid
               ? "is-invalid"
               : "is-valid"
             : ""
         }`}
      />

      <div className="d-flex justify-content-center">
        <button type="submit" className="mx-2 mt-4 btn btn-success">
          {state.textinput}
        </button>
        <button
          type="button"
          onClick={cancelpasswordchage}
          className="btn btn-danger  mt-4"
        >
          cancell
        </button>
      </div>
    </form>
  );
}
export default FormPassword;
