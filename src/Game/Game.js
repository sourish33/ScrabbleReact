import React, { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import BoardAndRack from "../BoardAndRack"
import ControlButtons from "../ControlButtons/ControlButtons"
import ScoreKeeper from "../ScoreKeeper/ScoreKeeper"
import { DUMMY_PLAYERS, TILE_LIST_ARR, LAST_PLAYED } from "../Utils/DummyData"

const Game = () => {

    const [tiles, setTiles] = useState(TILE_LIST_ARR)
    const [visibleRack, setVisibleRack] = useState("p")
    const [lastPlayed, setLastPlayed] = useState(LAST_PLAYED)
    const [pointsPossible, setPointsPossible] = useState(0)
    const [playersAndPoints, setPlayersAndPoints] = useState(DUMMY_PLAYERS)
    const [currentPlayer, setCurrentPlayer] = useState(2)
    const [tilesLeft, setTilesLeft] = useState(47)
    const [maxPoints, setMaxPoints] = useState(150)
    const [buttonsDisabled, setButtonsDisabled] = useState(false)

    const updateTiles = (tiles)=>{
        setTiles(x=>tiles)
    }
    return (
        <Container>
            <Row>
                <Col sm={12} lg={7} md={12}>
                    <BoardAndRack tiles={tiles} visibleRack={visibleRack} updateTiles={updateTiles}></BoardAndRack>
                </Col>
                <Col sm={12} lg={2} md={12}>
                    <ControlButtons disabled={buttonsDisabled} />
                </Col>
                <Col sm={12} lg={3} md={12}>
                    <ScoreKeeper
                        pointsPossible={pointsPossible}
                        playersAndPoints={playersAndPoints}
                        currentPlayer ={currentPlayer}
                        tilesLeft={tilesLeft}
                        maxPoints ={maxPoints}
                        lastPlayed = {lastPlayed}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Game
