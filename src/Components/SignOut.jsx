import React from "react";

import firebase from "firebase/app";

const auth = firebase.auth();
export default function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}
