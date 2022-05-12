import './App.css';
import React , {useEffect, useState} from 'react';
import { FormControl, Input} from '@material-ui/core';
import Message from './Message';
import db from './firebase';
import {collection, query, orderBy, addDoc, onSnapshot, serverTimestamp} from 'firebase/firestore';
import FlipMove from 'react-flip-move';
import SendIcon from "@material-ui/icons/Send"
import {IconButton} from '@material-ui/core';

function App() {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState([]);
  const [username, setUsername] = useState('');
  
// useState is a hook that allows you to create a state variable.
// It takes in a value and a function that will be called every time the state changes.
// The function will receive the current state as an argument.

useEffect(() => {
  const q = query(collection(db, 'messages'),orderBy('timestamp', 'desc'));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    /* Creating an empty array. */
      const conversations = []
   
  /* Mapping through the snapshot.docs and pushing the id and data into the conversations array. */
      snapshot.docs.map(doc => (
      conversations.push({
          id: doc.id,
      ...doc.data()
      })
      ))
 /* Setting the state of the message to the conversations array. */
  setMessage(conversations);
})
return () => { unsubscribe();}

}, []) // condition

// useEffect is a hook that allows you to run a piece of code after the component is rendered.
// It takes in a function that will be called after the component is rendered.
// The function will receive the current state as an argument.
useEffect(() => {
      // run code here...
      // if its blank inside [] it will run once
      // if you put something inside [] it will run every time the state changes
    setUsername(prompt('Please enter your name'))
  }, []) // condition

  const sentMessage = (e) => {
    e.preventDefault();
       addDoc(collection(db, 'messages'), {
       message: input,
        username: username,
        timestamp: serverTimestamp()
    })
    setInput('');
  };

  return (
    <div className="App">
      <img src='https://logos-world.net/wp-content/uploads/2021/02/Facebook-Messenger-Logo.png' style={{height: '100px', marginTop: "20px"}} alt='msg'/>
      <h1>Messenger Clone 🚀</h1>
      <h2>Welcome {username}</h2>
     <form className='app__form'>
      <FormControl className='app__formControl'>
        <Input className='app__input' placeholder='Enter a message....' value={input} onChange={event => setInput(event.target.value)} type="text"/>
       <IconButton className='app__iconButton' disabled={!input} variant="contained" color="primary" type="submit" onClick={sentMessage}>
        <SendIcon />
       </IconButton >
      </FormControl>
     </form>
     <FlipMove>
     {message.map((msg) => (
        <Message key={msg.id} username={username} msg={msg} />
      ))}
     </FlipMove>
      
    </div>
  );
}

export default App;
