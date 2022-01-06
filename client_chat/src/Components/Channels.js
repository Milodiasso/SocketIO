import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button} from "react-bootstrap";
import { useHistory } from "react-router-dom"
import {io} from "socket.io-client";



const socket = io("http://127.0.0.1:5000")



const Channels = (props) => {
    const history = useHistory();
    let url = new URL(window.location.href);
    let user = url.searchParams.get('name')
    let channel = url.searchParams.get('channel')
    
    const handleButton = async (e) =>{
        let newChan = e.target.innerText;
        history.replace(`chat?name=${user}&channel=${newChan}`)
        history.go()
        document.reload()
    }

    return (

        <div>
            <h2>Channels: </h2>
            {props.rooms.map((item, i ) => (
                <Button variant ="info" style={{margin: "2px"}} onClick={(e)=>handleButton(e)} key={i} className="chan">{item}</Button>
            ))}
        </div>
    )
}


export default Channels;
