import React,{useState , useEffect} from 'react';
import queryString from 'query-string'
import socketIOClient from 'socket.io-client'

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import './Chat.css'
import TextContainer from '../TextContainer/TextContainer';



let socket;

const Chat = ({location}) => {

    const [name , setName] = useState('')
    const [room , setRoom] = useState('')
    const [users, setUsers] = useState('')
    const [message , setMessage] = useState('')
    const [messages , setMessages] = useState([])
    const ENDPOINT = 'http://localhost:5000'

    useEffect(() => {
       const {name , room } = queryString.parse(location.search)

       socket = socketIOClient(ENDPOINT,{
           transports:['websocket' , 'polling' , 'flashsocket']
       })
       
       setName(name)
       setRoom(room)
       
       socket.emit('join' , {name , room} , (error)=>{
          if(error){
             alert('error')
          }
       })
   
       return () => {
          socket.emit('disconnect');
          socket.off();
       }

    },[ENDPOINT,location.search])

    useEffect(() => {
       socket.on('message', (message) => {
          setMessages([...messages , message])
       })

       socket.on("roomData", ({ users }) => {
         setUsers(users);
       });

    },[messages])

    const sendMessage = (event) => {
       event.preventDefault();

       if(message){
          socket.emit('sendMessage',message,() => setMessage(''))
       }
    }

    console.log(message,messages)
    
    return (
       <div className='outerContainer'>
         <div className='container'>
            <InfoBar room={room}/>
            <Messages 
            messages={messages}
            message={message}
            name={name}/>
            <Input 
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}/>
         </div>
         <TextContainer users={users}/>
       </div>
    )
}
export default Chat