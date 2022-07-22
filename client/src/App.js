import './App.css';
import { io } from 'socket.io-client';
import { useState } from 'react';
import Chats from './Chats';

const socket = io.connect("http://localhost:5000");

function App() {

  

  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  function joinRoom(){

    if(userName !== "" && room !== ""){
      socket.emit("join_room",room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      { !showChat ?(
      <div className='joinChatContainer'>
      <h3>Join a chat</h3>
      <input onChange={(event) => {setUserName(event.target.value)}} type="text" placeholder='John Doe'/><br></br>
      <input onChange={(event) => {setRoom(event.target.value)}} type="text" placeholder='Room ID'/>
      <button onClick={joinRoom}>Join a Room</button>
      </div>)
      :(
      <Chats socket = {socket} userName = {userName} room = {room}/>
      )}
    </div> 
  );
}

export default App;
