import React from "react"
import {Col, Container, Row } from "react-bootstrap"
import Game from "../Game"
import ControlButtons from "../ControlButtons/ControlButtons"
import ScoreKeeper from "../ScoreKeeper/ScoreKeeper"


const GameScreen = () => {
    return (
        <Container>
            <Row>
                <Col sm={12} lg={7} md={12}>
                    <Game visibleRack="p"></Game>
                </Col>
                <Col sm={12} lg={2} md={12} >
                    <ControlButtons disabled={false}/> 
                </Col>
                <Col sm={12} lg={3} md={12}>
                    <ScoreKeeper points={5}/>
                </Col>
            </Row>
        </Container>
    )
}

export default GameScreen
