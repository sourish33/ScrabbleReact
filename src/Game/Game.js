import React, { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import BoardAndRack from "../BoardAndRack"
import ControlButtons from "../ControlButtons/ControlButtons"
import ScoreKeeper from "../ScoreKeeper/ScoreKeeper"
import { DUMMY_PLAYERS, TILE_LIST_ARR, LAST_PLAYED } from "../Utils/DummyData"

const Game = () => {

    const [tiles, setTiles] = useState(TILE_LIST_ARR)

    const updateTiles = (tiles)=>{
        setTiles(x=>tiles)
    }
    return (
        <Container>
            <Row>
                <Col sm={12} lg={7} md={12}>
                    <BoardAndRack tiles={tiles} visibleRack="p" updateTiles={updateTiles}></BoardAndRack>
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

export default Game
