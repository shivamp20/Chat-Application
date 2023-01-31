import React from 'react'
import './Message.css'

const Message = ({user,message,classs}) => {

    if(user==='Admin'){
        return(
                <div className='adminmsgcontainer'>
                    <div className='adminmsg'> 
                        {`${user}:${message}`}


                    </div>

                </div>
            
        )
    }

    else if(user){
        return (
            <div className= {`messageBox ${classs}`}>
                {`${user}:${message}`}
                
              
            </div>
          )

    }
   

    else{
        return (
            <div className= {`messageBox ${classs}`}>
                {`You: ${message}`}
              
            </div>
          )

    }
  
}

export default Message
