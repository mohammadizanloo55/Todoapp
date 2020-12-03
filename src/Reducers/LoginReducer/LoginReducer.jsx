function LoginReducer(state, action) {
  switch (action.type) {
    case "Login_Submit": {
      return Login_Submit(state, action);
    }
    case "Signup_Submit": {
      return Signup_Submit(state, action);
    }
    case "logout": {
      return logout(state, action);
    }
    default: {
      throw Error("your type is invalid");
    }
  }
}
let Login_Submit = (state, action) => {
  let { event } = action.payload;

  event.preventDefault();
  return {
    ...state,
    Userislogin: true,
  };
};
let Signup_Submit = (state, action) => {
  let { email, Password , firebasehash } = action.payload;

  return {
    ...state,
    User_is_ok: true,
    email,
    Password,
    firebasehash
  };
};
let logout = (state, action) => {
  return {
    User_is_ok: false,
    Password: null,
    email: null,
    firebasehash:""
    
  };
};
export default LoginReducer;