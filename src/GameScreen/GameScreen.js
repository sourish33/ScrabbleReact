import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import Game from "../Game"
import styles from './GameScreen.module.css'
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
                <Col sm={12} lg={2} className={`d-flex flex-lg-column ${styles['horz-btns']}`}>
                    <Button className="mt-2" variant="primary" disabled={false}>Shuffle</Button>
                    <Button className="mt-2" variant="primary" disabled={false}>Recall</Button>
                    <Button className="mt-2" variant="primary" disabled={false}>Exchange</Button>
                    <Button className="mt-2" variant="warning" disabled={false}>Pass</Button>
                    <Button className="mt-2" variant="info">Dictionary</Button>
                    <Button className="mt-2" variant="success" disabled={false}>Play</Button>
                </Col>
                <Col sm={12} lg={3}>
                    3 of 3
                </Col>
            </Row>
        </Container>
    )
}

export default GameScreen
