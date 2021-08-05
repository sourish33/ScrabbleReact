import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import Game from "../Game"
import ControlButtons from "../ControlButtons/ControlButtons"
import ScoreKeeper from "../ScoreKeeper/ScoreKeeper"
import { DUMMY_PLAYERS, TILE_LIST_ARR, LAST_PLAYED } from "../Utils/DummyData"

const GameScreen = () => {
    return (
        <Container>
            <Row>
                <Col sm={12} lg={7} md={12}>
                    <Game tilesArray={TILE_LIST_ARR} visibleRack="p"></Game>
                </Col>
                <Col sm={12} lg={2} md={12}>
                    <ControlButtons disabled={false} />
                </Col>
                <Col sm={12} lg={3} md={12}>
                    <ScoreKeeper
                        pointsPossible={15}
                        playersAndPoints={DUMMY_PLAYERS}
                        currentPlayer ={1}
                        tilesLeft={79}
                        maxPoints ={150}
                        lastPlayed = {LAST_PLAYED}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default GameScreen
