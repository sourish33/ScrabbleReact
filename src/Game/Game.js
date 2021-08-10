import React, { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import BoardAndRack from "../BoardAndRack"
import ControlButtons from "../ControlButtons/ControlButtons"
import ScoreKeeper from "../ScoreKeeper/ScoreKeeper"
import { DUMMY_PLAYERS, TILE_LIST_ARR, LAST_PLAYED } from "../Utils/DummyData"

const Game = ( {gameVariables, exitGame} ) => {

    const [tiles, setTiles] = useState(TILE_LIST_ARR)
    const [whoseMove, setWhoseMove] = useState(1)
    const [visibleRack, setVisibleRack] = useState("p")
    const [lastPlayed, setLastPlayed] = useState(LAST_PLAYED)
    const [pointsPossible, setPointsPossible] = useState(0)
    
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [tilesLeft, setTilesLeft] = useState(47)  
    const [buttonsDisabled, setButtonsDisabled] = useState(false)

    const players = gameVariables.players
    const shufflePlayers = gameVariables.shufflePlayers
    const dictCheck = gameVariables.dictCheck
    const maxPoints = parseInt(gameVariables.gameType)

    const playerTable = players.map((el)=>{
        return ({name: el.name, level: el.level, points: 0})
    })
    const [playersAndPoints, setPlayersAndPoints] = useState(playerTable)

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
                        exitGame = {exitGame}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Game
