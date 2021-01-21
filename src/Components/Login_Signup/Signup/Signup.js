import { Firebase_Signup } from "../../../firebase/firebase";

const Signup = (context, state, setState) => {
  let { Email_inputvalue, Password_inputvalue } = state;
  Firebase_Signup(Email_inputvalue, Password_inputvalue)
    .then((data) => Firebase_Then("Signup_or_Login_Submit", data))
    .catch((err) => Firebase_Catch(err));

  const Firebase_Then = (type, payload) => {
    context.Logindispatch({
      type,
      payload: {
        User: payload,
      },
    });
  };
  const Firebase_Catch = (err) => {
    console.error(err);
    setState({
      ...state,
      Inloading: false,
      Iserr: true,
      errtext: `${err.message} : ${err.code}`,
    });
  };
};

export default Signup;
