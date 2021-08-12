import React, { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Swal from "sweetalert2"
import BoardAndRack from "../BoardAndRack"
import ControlButtons from "../ControlButtons/ControlButtons"
import ScoreKeeper from "../ScoreKeeper/ScoreKeeper"
import { TILE_LIST_ARR, LAST_PLAYED } from "../Utils/DummyData"
import scrabbledict, { checkDict } from "../Utils/Dictionary/dictionary"
import { makePlayertable } from "../Utils/helpers"
import CheckDictionaryModal from "../CheckDictionaryModal/CheckDictionaryModal"



const Game = ({ gameVariables, exitGame }) => {
    const [tiles, setTiles] = useState(TILE_LIST_ARR)
    const [whoseMove, setWhoseMove] = useState(1)
    const [visibleRack, setVisibleRack] = useState("p")
    const [lastPlayed, setLastPlayed] = useState(LAST_PLAYED)
    const [pointsPossible, setPointsPossible] = useState(0)
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [tilesLeft, setTilesLeft] = useState(47)
    const [buttonsDisabled, setButtonsDisabled] = useState(false)

    //parsing incoming data from the welcome page
    const players = gameVariables.players
    const shufflePlayers = gameVariables.shufflePlayers
    const dictChecking = gameVariables.dictCheck
    const maxPoints = parseInt(gameVariables.gameType)

    const playerTable = makePlayertable(players, shufflePlayers)
    const [playersAndPoints, setPlayersAndPoints] = useState(playerTable)

    const shuffleRack = () => {
        console.log("Shuffling rack")
    }

    const lookup = () => {
        Swal.fire("Will lookup dictionary!")
    }

    const updateTiles = (tiles) => {
        setTiles((x) => tiles)
    }
    return (
        <>
        <CheckDictionaryModal show={false}/>
            <Container>
                <Row>
                    <Col sm={12} lg={7} md={12}>
                        <BoardAndRack
                            tiles={tiles}
                            visibleRack={visibleRack}
                            updateTiles={updateTiles}
                        ></BoardAndRack>
                    </Col>
                    <Col sm={12} lg={2} md={12}>
                        <ControlButtons
                            shuffleRack={shuffleRack}
                            lookup = {lookup}
                            disabled={buttonsDisabled}
                        />
                    </Col>
                    <Col sm={12} lg={3} md={12}>
                        <ScoreKeeper
                            pointsPossible={pointsPossible}
                            playersAndPoints={playersAndPoints}
                            currentPlayer={currentPlayer}
                            tilesLeft={tilesLeft}
                            maxPoints={maxPoints}
                            lastPlayed={lastPlayed}
                            exitGame={exitGame}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Game
