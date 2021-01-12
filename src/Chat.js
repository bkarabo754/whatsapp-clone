import React, { useState, useEffect } from 'react'
import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import './Chat.css'
import { AttachFile, Message, MoreVert, SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import SendIcon from '@material-ui/icons/Send';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';


function Chat() {
    const [seed, setSeed] = useState('')
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue()
    
    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot((snapshot) => setRoomName
            (snapshot.data().name));
                
                db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => 
                    doc.data()))
                );
            
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])
    
    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typed >>>>', input);
        
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        
        setInput("")
    }
    
    return (
        <div className="chat">
            
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    last seen{" "}
                    {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                    } 
                </div>
                
                <div className="chat__headerRight">
            <Tooltip title="Search">
                <IconButton arial-label="Search">
                    <SearchOutlined />
                </IconButton>
                </Tooltip>
            <Tooltip title="Attach file">
                <IconButton arial-label="Attach file">
                    <AttachFile />
                </IconButton>
                </Tooltip>
            <Tooltip title="More options">
                <IconButton arial-label="More options">
                    <MoreVert />
                </IconButton>
                </Tooltip>
                </div>
            </div>
            
            <div className="chat__body">
            {messages.map(message => (
                <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                <span className="chat__name">{message.name}</span>
                {message.message}
                <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
                </p>
            ))}
                
            </div>
            
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <SendIcon />
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
