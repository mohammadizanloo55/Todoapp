function LoginReducer(state, action) {
  switch (action.type) {
    case "Signup_or_Login_Submit": {
      return Signup_or_Login_Submit(state, action);
    }
    case "logout": {
      return logout(state, action);
    }
    case "tooglesetting": {
      return tooglesetting(state);
    }
    case "toogletheme": {
      return toogletheme(state);
    }
    default: {
      throw Error("your type is invalid");
    }
  }
}

let Signup_or_Login_Submit = (state, action) => {
  let { User } = action.payload;
  return {
    ...state,
    User_is_ok: true,
    User,
  };
};
let logout = (state) => {
  return {
    ...state,
    Islogout: true,
    User: null,
    User_is_ok: false,
  };
};
let tooglesetting = (state) => {
  return {
    ...state,
    settingShow: !state.settingShow,
  };
};
let toogletheme = (state) => {
   return {
    ...state,
    themeDark: !state.themeDark,
  };
};
export default LoginReducer;
