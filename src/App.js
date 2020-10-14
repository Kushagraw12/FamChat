import React, { createRef,useRef,useState } from 'react';
import './App.css';

import firbaseConfig from './FireConfig';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Delete, Loader } from './Icons';

firebase.initializeApp( firbaseConfig )

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
  const query = messagesRef.orderBy('createdAt',"desc").limit(150); //This line affects the limit that the participants can send. Implemented to stop spamming. 
  
  const [messages] = useCollectionData(query, { idField: 'id' });
  
  const [formValue, setFormValue] = useState('');

  const [sendingMsg, setSendingMsg] = useState(false);

  const sendMessage = async (e) => {
    
    e.preventDefault();
    
    if(sendingMsg)
      return;

    setSendingMsg(true);

    const { uid, photoURL} = auth.currentUser;

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
  
  return (<>
    <main>
      <MessageList messages={messages ? messages : []} />
      <span ref={dummy}></span>
    </main>

    <form onSubmit={sendMessage}>
      
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type your message!" />

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

class MessageList extends React.Component{
  dummy = createRef();
  lastMessageId = null
  deleteMessage = async (id) => {
    await firestore.collection("messages").doc(id).delete();
  }
  shouldComponentUpdate(nextProps){
    const newMessags = nextProps.messages;
    const messages = this.props.messages;
    if(newMessags.length !== messages.length){
      return true;
    }  

    for(let i = 0; i < newMessags.length ; i++){
      if(newMessags[i].id !== messages[i].id){
        return true;
      }
    }
    return false;
  }
  render(){
    const {messages} = this.props;
    return (
      <>
      {messages && messages.reverse().map(msg => <ChatMessage key={msg.id} message={msg} deleteMessage={this.deleteMessage} />)} 
      </>
    )
  }
}
function ChatMessage(props) {
  const { text, uid, photoURL, id, createdAt } = props.message;
  const [isSelected,setSelected] = useState(false);
  const [isDeleting,setDeleting] = useState(false);
  const isAuthor = uid === auth.currentUser.uid;
  const deleteMessage = props.deleteMessage;
  const messageClass = isAuthor ? 'sent' : 'received';
  const date = new Date(createdAt.seconds * 1000);
  console.log(createdAt, "CR")
  const time = date.toLocaleTimeString([], { day: '2-digit', hour: '2-digit', minute: '2-digit' });
  const time2 = date.toTimeString([], { dateStyle: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZoneName: 'short'});
  
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
      <div className="message-text">
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='Face' />
        <p
          onClick={isAuthor ? ()=>setSelected(!isSelected) : null}
        >{text}
        <br />
        <cite className='message-time'><>Sent: {time}</></cite>
        </p>
        
      </div>
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
