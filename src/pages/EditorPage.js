import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
const ACTIONS = require('../Actions'); // Update the path accordingly

export default function EditorPage() {
  const socketRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { roomId } = useParams();

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        socketRef.current = await initSocket();
        socketRef.current.on('connect_error', handleErrors);
        socketRef.current.on('connect_failed', handleErrors);

        function handleErrors(err) {
          console.log('socket error', err);
          toast.error('Socket connection failed, try again later.');
          reactNavigator('/');
        }

        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username,
        });

        socketRef.current.on(ACTIONS.JOINED, handleUserJoined);

        socketRef.current.on(ACTIONS.DISCONNECTED, handleUserDisconnected);
      } catch (error) {
        console.error('Error initializing socket:', error);
        toast.error('Error initializing socket.');
        reactNavigator('/');
      }
    };

    const handleUserJoined = ({ clients: updatedClients, username, socketId }) => {
      if (username !== location.state?.username) {
        toast.success(`${username} joined the room.`);
      }

      setClients(updatedClients);
    };

    const handleUserDisconnected = ({ socketId, username }) => {
      toast.success(`${username} left the room.`);
      setClients((prev) => prev.filter((client) => client.socketId !== socketId));
    };

  
    

    if (location.state?.username) {
      init();
    }
    console.log('Rendering MyComponent');

    return () => {
      // Cleanup code if needed
      // This will be executed when the component unmounts or when the dependency changes
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.JOINED, handleUserJoined);
        socketRef.current.off(ACTIONS.DISCONNECTED, handleUserDisconnected);
      }
    };
  }, [location.state?.username, reactNavigator]);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room Id has been copied to your clipboard');
    } catch (err) {
      toast.error('Could not copy Room Id');
      console.log(err);
    }
  }

  function leaveRoom() {
    reactNavigator('/');
  }

  if (!location.state?.username) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className='logoImage' src="/code-sync.png" alt="" />
          </div>

          <h3>Connected</h3>

          <div className="clientList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>

        <button className="btn copyBtn" onClick={copyRoomId}>
          Copy ROOM ID
        </button>
        <button className="btn leaveBtn" onClick={leaveRoom}>
          Leave
        </button>
      </div>

      <div className="editorWrap">
        <Editor socketRef={socketRef} roomId={roomId} />
        <button className='btn runBtn' onClick={handleRun}>Run</button>
      </div>
    </div>
  );
}
