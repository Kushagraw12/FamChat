import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import firbs from './FireConfig';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Delete, Loader } from './Icons';

firebase.initializeApp( firbs )

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>FamChat</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt',"desc").limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const [sendingMsg, setSendingMsg] = useState(false);

  const [lastMessageId,setLastMessageId] = useState(null);

  const sendMessage = async (e) => {
    
    e.preventDefault();
    
    if(sendingMsg)
      return;

    setSendingMsg(true);

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setSendingMsg(false);

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  const deleteMessage = async (id) => {
    await firestore.collection("messages").doc(id).delete();
  }

  if(messages){
    messages.reverse();
  }

  useEffect(()=>{
    if(messages && messages.length && lastMessageId !== messages[messages.length-1].id){
      setLastMessageId(messages[messages.length-1].id)
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  },[lastMessageId,messages]);
  
  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} deleteMessage={deleteMessage} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!(formValue || sendingMsg)}>
        {sendingMsg ?
          <Loader/>
          :
          "Send"
        }
      </button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL,id } = props.message;
  const [isSelected,setSelected] = useState(false);
  const [isDeleting,setDeleting] = useState(false);
  const isAuthor = uid === auth.currentUser.uid;
  const deleteMessage = props.deleteMessage;
  const messageClass = isAuthor ? 'sent' : 'received';

  const selectedClass = isSelected ? 'selected' : '';

  const deleteMsg = () => {
    setDeleting(true);
    deleteMessage(id)
    .catch(e=>{
      console.log(e);
    });
  }
  return (<>
    <div className={`message ${messageClass} ${selectedClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='Face' />
      <p
        onClick={isAuthor ? ()=>setSelected(!isSelected) : null}
      >{text}</p>
    </div>
    { isSelected && 
        <div className="tools">
          <span>
            {isDeleting ?
              <Loader/>
              :
              <Delete onClick={deleteMsg}/>
            }
          </span>
        </div>
      }
  </>)
}

export default App;