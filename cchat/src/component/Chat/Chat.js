import React, { useEffect,useState } from 'react'
import {user} from '../Join/Join';
import socketIo from 'socket.io-client';
import './Chat.css';
import sendLogo from '../../../src/download.png';
import Message from '../Message/Message';
import cancelLogo from '../../../src/Download.png';


import ReactScrolltoBottom from 'react-scroll-to-bottom';



const ENDPOINT="http://localhost:4500";
let socket;

const Chat = () => {
    const[messages,setmessage]=useState([]);
    const[id,setid]=useState("");

    const send=()=>{
        const message= document.getElementById('chatInput').value;
        socket.emit('message',{message,id});
        document.getElementById('chatInput').value="";

    }
    
    

    useEffect(()=>{
        
        socket = socketIo(ENDPOINT,{transports:['websocket']})
        socket.on("connect",()=>{
            alert("connected");
            setid(socket.id);
            
        })
        

        socket.emit('joined',{user})//event name is joined and emit means sending data to backend
        socket.on('welcome',(data)=>{
            setmessage([...messages,data])

            console.log(data.user,data.message);

        })

        return ()=>{
            socket.emit('disconnect');
            socket.off(); 

        }   

    },[])

    useEffect(()=>{
        socket.on('userjoined',(data)=>{
            setmessage([...messages,data])
            console.log(data.user,data.message);
        })

        socket.on('leave',(data)=>{
            setmessage([...messages,data])
            console.log(data.user,data.message);
        })

        
        socket.on('sendMessage',(data)=>{
                setmessage([...messages,data])
                console.log(data.user,data.message,data.id);
        })

        return ()=>{
            socket.off();
        }
    },[messages])

    
       
  return (
    <div className='chatpage'>
        <div className='chatContainer'>
        <div className='header'>
            <h2 className='subheading'>CHAT APP</h2>
            <a href='/'><img src={cancelLogo}/></a>
        </div>
        <ReactScrolltoBottom className='chatbox'>
            
            {messages.map((items,i)=><Message user={items.id===id?'':items.user} message={items.message} classs={items.id===id?'right':"left"}/>)}
            
        </ReactScrolltoBottom>
        
        <div className='inputbox'>
           <input type="text" id='chatInput'/>
           <button onClick={send}   className='sendBtn'>{<img src={sendLogo}/>}</button>

        </div>
        

        </div>
        
        
      
    </div>
  )
}

export default Chat
