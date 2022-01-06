import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom"




const Login = () => {
    const history = useHistory();
    const [pseudo, setPseudo] = useState('')
    const [channel, setChannel] = useState('')

    const handleChange = (e) => {
        history.push(`/chat?name=${pseudo}&channel=${channel}`);
    }

    return (
        <Container>
            <Row >
                <Col xs={12}>
                    <h1>Chat line</h1>
                </Col>
                <Col xs={6}>Pseudo : <input name="pseudo" type="text" onChange={(e) => setPseudo(e.target.value)} /> </Col>
                <Col xs={6}>Channel: <input name="channel" type="text" onChange={(e) => setChannel(e.target.value)} /> </Col>
                <Col style={{ margin: ' 10px 0' }}><Button variant="primary" onClick={handleChange}>Connect</Button> </Col>
            </Row>
        </Container>
    )
}

export default Login