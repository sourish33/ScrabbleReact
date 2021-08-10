import React, { useState } from "react"
import { Container } from "react-bootstrap"
// import {BrowserRouter as Router, Switch, Route, Link  } from "react-router-dom";
import Game from "../Game/Game";

import GameInfo from "../GameInfo/GameInfo"
import styles from './FrontPage.module.css'



  



const FrontPage = () => {
    const [gameVariables, setGameVariables] = useState({})

    const handleSubmit = (event, players, shufflePlayers, dictCheck, gameType) =>{
        event.preventDefault()
        for (let i=0;i<players.length;i++){
            if (players[i].name===""){
                alert(`Please name player ${i+1}`)
                return
            }
        }
        let x={}
        x.players=players
        x.shufflePlayers=shufflePlayers
        x.dictCheck = dictCheck
        x.gameType = gameType
        setGameVariables(x)
    }

    const exitGame = () => {
        setGameVariables({})
    }

    const ShowData = (props) =>{
        return(
            <div style={{ marginTop: 20 }}>
                    {JSON.stringify(props.data, null, 2)}
             </div>
        )
    }
    const WelcomePage = () => {
        return (
            <div>
            <div className={`p-5 mb-4 bg-light rounded-3 ${styles.headerImage}`}>
                <h1 className={`display-4 `}>Scrabble React!</h1>
                <h3>A scrabble game built using React.js</h3>
            </div>
                <Container>
                    <GameInfo handleSubmit={handleSubmit}/>  
                    {/* <ShowData data={gameVariables}/>    */}
                </Container>
            </div>
            

        )
    }


    return (
        <>
        {Object.keys(gameVariables).length===0 ? <WelcomePage/> : <Game gameVariables={gameVariables} exitGame={exitGame}/>}
        </>
    )
}

export default FrontPage
