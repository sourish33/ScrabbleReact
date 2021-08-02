import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import Game from "../Game"

const GameScreen = () => {
    return (
        <Container>
            <Row>
                <Col sm={12} lg={7}>
                    <Game visibleRack="p"></Game>
                </Col>
                <Col sm={12} lg={2} className="d-flex flex-lg-column flex-sm-row">
                    <Button className="btn btn-primary">Shuffle</Button>
                    <Button className="btn btn-primary mt-2">Recall</Button>
                    <Button className="btn btn-primary mt-2">Exchange</Button>
                    <Button className="btn btn-danger mt-2">Pass</Button>
                    <Button className="btn btn-info mt-2">Dictionary</Button>
                    <Button className="btn btn-success mt-2">Play</Button>
                </Col>
                <Col sm={12} lg={3}>
                    3 of 3
                </Col>
            </Row>
        </Container>
    )
}

export default GameScreen
