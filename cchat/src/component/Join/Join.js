import React, { useState } from 'react'
import './Join.css';
import logo from "/home/shivam/Documents/React messaging app/CHAT APP/cchat/src/360_F_417265589_3icF8VsU9yT6mTWTAeFkGry8JKQdztxt.jpg"

import {Link, useAsyncValue} from 'react-router-dom';

let user;

const Join = () => {

    const senduser =()=>{
        user=document.getElementById("joinInput").value;

    }

    const[name,setName]= useState("");

  return (
    <div>
        <div className='JoinPage'>
            <div className='JoinContainer'>
                <img src={logo} alt=""/>
                <h1>CHAT APP</h1>
                <input onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput"/>
                <Link to='/chat' onClick={(event)=>!name?event.preventDefault():null}><button className='joinbtn' onClick={senduser}>Login</button></Link>
               

            </div>

        </div>
        
        
      
    </div>
  )
}

export default Join
export {user}
