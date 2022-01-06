import {io} from "socket.io-client";
import React, { useState, useEffect } from "react";
import {Container, Toast, Button, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import Channels from "./Channels"
import { useHistory } from "react-router-dom"



const socket = io("http://127.0.0.1:5000")

const Socket = () => {
    const history = useHistory();
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [channels, setChannels] = useState([]);
    const url = new URL(window.location.href)
    const user = url.searchParams.get('name')
    var channel = url.searchParams.get('channel')

    
 
    useEffect(()=>{
        socket.emit("join", channel, user)
        socket.on("joined", (canal, client)=>{
            NotificationManager.info(`${client} has joined on channel ${canal}`)

        })
        socket.on("message", (message)=>{
            setMessages((messages) => [...messages, message])
            let scroll = document.querySelector('.messages');
            scroll.scrollTop = scroll.scrollHeight;
        })
    },[])
    useEffect(() => {
        socket.on("canaux", (canaux) => {
            setChannels(canaux)
        })
    }, [])

    
    var send =  () => {
        let word = msg.split(' ');
        switch (word[0]) {
            case  "/create" :
                history.replace(`chat?name=${user}&channel=${word[1]}`)
                history.go()
                document.reload();
                break;

            case "/list" : 

        
            default: 
                socket.emit("send", msg, socket.id)
                break;
        }
        document.getElementById('msg').value = ""
    }



    return(
        <Container>

            <Row className="main">
            

                <Row  className="chat" display="flex" >
                    <h1>Chat en ligne</h1>
                    <Col md={12} className="messages">
                            {messages.map((item, i) =>(
                                <Toast key={i}>
                                <Toast.Header >
                                    <img src="holder.js/20x20?text=%21" className="rounded mr-2" alt="" />
                                    <strong className="mr-auto">{item.pseudo}</strong>
                                    <small> {item.date} </small>
                                </Toast.Header>
                                <Toast.Body> {item.text} </Toast.Body>
                                </Toast>
                            ))}
                    </Col>
                    <Col  md={12}>
                        <input type="text" id="msg"  onChange={(e)=>setMsg(e.target.value)} onKeyPress={(e)=>(e.key === "Enter" ? send() : null)} /> 
                        <Button className="primary" onClick={send} >Envoyer</Button>
                    </Col>
                </Row>
                <Row md={5}  className="channels">
                    <Col >
                        <Channels rooms={channels}/>
                    </Col>
                </Row>

            </Row>
            <NotificationContainer/>
        </Container>
    )
}

export default Socket