import React from "react";

import firebase from "firebase/app";

const auth = firebase.auth();

export default function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
          alt="Face"
        />
        <p>{text}</p>
      </div>
    </>
  );
}
