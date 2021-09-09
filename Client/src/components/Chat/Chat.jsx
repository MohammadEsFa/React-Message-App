import React,{useState , useEffect} from 'react';
import queryString from 'query-string'
import socketIOClient from 'socket.io-client'



let socket;

const Chat = ({location}) => {

    const [name , setName] = useState('')
    const [room , setRoom] = useState('')
    const ENDPOINT = 'http://localhost:5000'

    useEffect(() => {
       const {name , room } = queryString.parse(location.search)

        socket = socketIOClient(ENDPOINT,{
           transports:['websocket' , 'polling' , 'flashsocket']
       })
       
       setName(name)
       setRoom(room)
       
       socket.emit('join' , {name , room})
   
       return () => {
          socket.emit('disconnect');
          socket.off();
       }

    },[ENDPOINT,location.search])
    
    return (
       <h3>Chat</h3>
    )
}
export default Chat