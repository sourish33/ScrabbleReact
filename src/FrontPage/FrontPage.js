import React, { useState } from "react"
import { Container } from "react-bootstrap"
import Swal from "sweetalert2";
import Game from "../Game/Game";

import GameInfo from "../GameInfo/GameInfo"
import styles from './FrontPage.module.css'



  



const FrontPage = () => {
    const [gameVariables, setGameVariables] = useState({})

    const handleSubmit = (event, players, shufflePlayers, dictCheck, gameType) =>{
        event.preventDefault()
        if (players.length<2) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `At least two players required`,
              })
              return
        }
        for (let i=0;i<players.length;i++){
            if (players[i].name===""){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Please name player ${i+1}`,
                  })
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

    const WelcomePage = () => {
        return (
            <div>
            <div className={`p-5 mb-4 bg-light rounded-3 ${styles.headerImage}`}>
                <h1 className={`display-4 `}>Scrabble React!</h1>
                <h3>A scrabble game built using React.js</h3>
            </div>
                <Container>
                    <GameInfo handleSubmit={handleSubmit}/>  
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
