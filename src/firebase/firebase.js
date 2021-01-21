import firebase from "firebase";
import "firebase/auth";
import "firebase/app";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_BASEURL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();

const Firebase_Login = (username, password) => {
  return firebase.auth().signInWithEmailAndPassword(username, password);
};
const Firebase_Signup = (username, password) => {
  return firebase.auth().createUserWithEmailAndPassword(username, password);
};
const Firebase_Login_currentuser = (state, setState, callback) => {
  setState({
    ...state,
    Inloading: true,
  });
  return firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      callback(user);
    } else {
      setState({
        ...state,
        Inloading: false,
      });
      return null;
    }
  });
};
const Firebase_GetTodos = (UID) => {
  return firebase.database().ref(`/users/${UID}/Todos`).once("value");
};
const Firebase_WriteTodos = (UID, value) => {
  return firebase.database().ref(`/users/${UID}/`).set(value);
};
const Firebase_update_data = (UID, oldvalue, indexofall, newvalue) => {
  return firebase
    .database()
    .ref(`/users/${UID}/Todos/${indexofall}/`)
    .update({
      ...oldvalue,
      ...newvalue,
    });
};
const Firebase_Delete_data = (UID, newdate) => {
  return firebase.database().ref(`/users/${UID}`).update({
    Todos: newdate,
  });
};
const Firebase_Delete_Account = (password) => {
 const prom = new Promise(resolve=>{
  firebase.auth().onAuthStateChanged((user) => {
    if(user!==null && user !== undefined  ){
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
      );
      user
        .reauthenticateWithCredential(credential)
        .then(function () {
             user.delete()
        })
        .catch(function (error) {
          throw new Error(error)
        });
    }
    
  });
  resolve()
 })
 return prom
};
const Firebase_Reset_Password = (password)=>{
  const prom = new Promise((resolve)=>{
    firebase.auth().onAuthStateChanged((user) => {
      if(user!==null && user !== undefined  ){
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          password
        );
       user
          .reauthenticateWithCredential(credential)
          .then(function () {
           firebase.auth().sendPasswordResetEmail(user.email)       
            
          })
          .catch(function (error) {
            throw new Error(error)
          });
      }
      
    });
    resolve()
  })
  return prom
}
const Firebase_Signout = ()=>{
  return firebase.auth().signOut()
}  
export {
  Firebase_Signout,
  Firebase_Reset_Password,
  Firebase_Delete_Account,
  Firebase_Login,
  Firebase_Signup,
  Firebase_Login_currentuser,
  Firebase_GetTodos,
  Firebase_update_data,
  Firebase_Delete_data,
  Firebase_WriteTodos,
};
