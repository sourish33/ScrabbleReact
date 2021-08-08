import React, { useState } from "react"
import { Button, Container } from "react-bootstrap"
import GameInfo from "../GameInfo/GameInfo"
import styles from "./FrontPage.module.css"

const FrontPage = () => {
    const [gameVariables, setGameVariables] = useState({})

    const handleSubmit = (event, players, shufflePlayers, dictCheck, gameType) =>{
        event.preventDefault()
        let x={}
        x.players=players
        x.shufflePlayers=shufflePlayers
        x.dictCheck = dictCheck
        x.gameType = gameType
        setGameVariables(x)
    }
    return (
        <div>
            <div className="p-5 mb-4 bg-light rounded-3">
                <h1 className={`display-4 `}>Scrabble React!</h1>
                <h3>A scrabble game built using React.js</h3>
            </div>
            <Container>
                <GameInfo />
            </Container>
        </div>
    )
}

export default FrontPage
