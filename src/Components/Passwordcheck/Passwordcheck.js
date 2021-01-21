function Passwordcheck(password, errshow, errtext = "") {
  const PasswordState = {
    Iserr: false,
    Password_Isinvalid: false,
  };
  function ErrToogler(WichObject, IsErr) {
    for (const key in WichObject) {
      WichObject[key] = IsErr;
    }
    if (!errshow) {
      PasswordState.Iserr = false;
    }
    return WichObject;
  }

  if (!(password.length >= 6)) {
    return {
      ...ErrToogler(PasswordState, true),
      errtext,
      Password_Is_Changed: true,
    };
  } else {
    return {
      ...ErrToogler(PasswordState, false),
      Password_Is_Changed: true,
    };
  }
}
export default Passwordcheck;
