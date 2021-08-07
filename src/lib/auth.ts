import firebase from "firebase/app";
import { auth } from "../../firebase";


export const Login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result: any) {
      return result;
    })
    .catch(function (error) {
      console.log(error);
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};


// ログイン状態の検知
export const listenAuthState = (dispatch: any) => {
  return firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      dispatch({
        type: "login",
        payload: {
          user,
        },
      });
    } else {
      // User is signed out.
      // ...
      dispatch({
        type: "logout",
      });
    }
  });
};

export const firebaseUser = () => {
  return firebase.auth().currentUser;
};

// Logout
export const Logout = () => {
  auth.signOut().then(() => {
    window.location.reload();
  });
};

export const Auth = () => {
  const useAuth = {Logout, firebaseUser,listenAuthState,Login}
  return useAuth
}