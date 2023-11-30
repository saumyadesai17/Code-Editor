import React, { useState } from 'react'
import Client from '../components/Client';
import Editor  from '../components/Editor';


export default function EditorPage() {
    const [clients,setClients]=useState([
        {socketId:1,username:'Suyash'},{socketId:2,username:'Saumya'},
        {socketId:3,username:'Vivek'}
]);
  return (
    <div className='mainWrap'>
        <div className="aside">
            <div className="asideInner">
                <div className="logo">
                    <img className='logoImage' src="/code-sync.png" alt="" />
                </div>

                <h3>Connected</h3>

                <div className="clientList">
                    {
                        clients.map(client => (
                            <Client key={client.socketId}
                            username={client.username}/>
                        ))}
                </div>
            </div>

            <button className="btn copyBtn">Copy ROOM ID</button>

             <button className="btn leaveBtn">Leave</button>
        </div>
        <div className="editorWrap">
            <Editor/>
            <button className='btn runBtn'>Run</button>
        </div>
    </div>
  )
}
