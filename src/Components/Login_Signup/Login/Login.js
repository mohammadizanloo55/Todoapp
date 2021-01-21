import { Firebase_Login, Firebase_GetTodos } from "../../../firebase/firebase";

function Login(userisverifed, context, state, setState, User) {
  const Firebase_Then = (type, payload) => {
    
    Firebase_GetTodos(payload.uid)
      .then((Todos) => {
        setState({
          ...state,
          Inloading: false,
        });
        context.Tododispatch({
          type: "updateTodo",
          payload: {
            newTodos: Todos.val(),
          },
        });
        context.Logindispatch({
          type,
          payload: {
            User: payload,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        setState({
          ...state,
          Inloading: false,
          Iserr: true,
          errtext: `${err}`,
        });
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
  let { Email_inputvalue, Password_inputvalue } = state;
  if (!userisverifed) {
    Firebase_Login(Email_inputvalue, Password_inputvalue)
      .then((data) => {
        Firebase_Then("Signup_or_Login_Submit", data.user);
      })
      .catch((err) => Firebase_Catch(err));
  } else {
    Firebase_Then("Signup_or_Login_Submit", User);
  }
}
export default Login;
