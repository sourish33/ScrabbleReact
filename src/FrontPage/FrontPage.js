import React, { useState } from "react"
import { Container } from "react-bootstrap"
import GameInfo from "../GameInfo/GameInfo"


const FrontPage = () => {
    const [gameVariables, setGameVariables] = useState({})

    const handleSubmit = (event, players, shufflePlayers, dictCheck, gameType) =>{
        event.preventDefault()
        if (players.length<2) {
            alert("At least two players are required")
            return
        }
        let x={}
        x.players=players
        x.shufflePlayers=shufflePlayers
        x.dictCheck = dictCheck
        x.gameType = gameType
        setGameVariables(x)
    }

    const ShowData = (props) =>{
        return(
            <div style={{ marginTop: 20 }}>
                    {JSON.stringify(props.data, null, 2)}
             </div>
        )
    }
    return (
        <div>
            <div className="p-5 mb-4 bg-light rounded-3">
                <h1 className={`display-4 `}>Scrabble React!</h1>
                <h3>A scrabble game built using React.js</h3>
            </div>
            <Container>
                <GameInfo handleSubmit={handleSubmit}/>
            </Container>
            <ShowData data={gameVariables}/>
        </div>
    )
}

export default FrontPage
