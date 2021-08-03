import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import Game from "../Game"
import ControlButtons from "./ControlButtons"

<meta
    name="viewport"
    content="minimum-scale=1, initial-scale=1, width=device-width"
/>

const GameScreen = () => {
    return (
        <Container>
            <Row>
                <Col sm={12} lg={7}>
                    <Game visibleRack="p"></Game>
                </Col>
                <Col sm={12} lg={2}>
                    <ControlButtons disabled={true}/> 
                </Col>
                <Col sm={12} lg={3}>
                    3 of 3
                </Col>
            </Row>
        </Container>
    )
}

export default GameScreen
