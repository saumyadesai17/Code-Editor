import React,{useState} from 'react'
import {v4 as uuidV4} from 'uuid'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


export default function Home() {
    const navigate=useNavigate();


    const [roomId , setRommId]=useState("")
    const [username , setUsername]=useState("")

    const createNewRoom = (e) =>{
        e.preventDefault();
        const id = uuidV4();
        setRommId(id);
        toast.success('Created a new room')
    };

    const joinRoom = (e) =>{
        if(!roomId || !username){
            toast.error('ROOM ID & username is required');
            return;
        }
        navigate(`/editor/${roomId}`,{
            state:{
               username ,
            },
        });
    };

    const handleInputEnter = (e) =>{
        if(e.key === "Enter"){
            joinRoom();
        }

    }


  return (
    <div className='homePageWrapper'>
        <div className="formWrapper">
            <img src="/code-sync.png" alt="" className='homePageLogo'/>
            <h4 className='mainLabel'>Paste invitation ROOM ID</h4>
            <div className="inputGroup">
                <input type="text" className='inputBox' placeholder='ROOM ID'
                onChange={(e) => setRommId(e.target.value)}
                value={roomId}
                onKeyUp={handleInputEnter}/>

                <input type="text" className='inputBox' placeholder='USERNAME'
                 onChange={(e) => setUsername(e.target.value)}
                 value={username}
                 onKeyUp={handleInputEnter}/>

                <button className='btn joinBtn' onClick={joinRoom}>Join</button>

                <span className="createInfo">
                    If you don't ha an invite then create &nbsp;
                    <a href="" className="createNewBtn" onClick={createNewRoom}>new room</a>
                </span>
            </div>


        </div>

    </div>
    
  )
}
