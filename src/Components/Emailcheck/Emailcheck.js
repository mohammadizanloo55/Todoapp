function Emailcheck(email, errshow, errtext = "") {
  const EmailState = {
    Iserr: false,
    Email_Isinvalid: false,
  };
  function ErrToogler(WichObject, IsErr) {
    for (const key in WichObject) {
      WichObject[key] = IsErr;
    }
    if (!errshow) {
      EmailState.Iserr = false;
    }
    return WichObject;
  }
  const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!EmailRegex.test(email)) {
    // If the email was wrong
    return {
      ...ErrToogler(EmailState, true),
      Email_Is_Changed: true,
      errtext,
    };
  } else {
    // If the email was correct
    return {
      ...ErrToogler(EmailState, false),
      Email_Is_Changed: true,
    };
  }
}
export default Emailcheck;
