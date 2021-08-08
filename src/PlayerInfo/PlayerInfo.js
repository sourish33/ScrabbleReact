import React, { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import styles from "./PlayerInfo.module.css"


const DUMMY_PLAYERS = [
    // {name: "", type: "", level: 0},
]
const PlayerInfo = () => {

    const [players, setPlayers] = useState(DUMMY_PLAYERS)

    const handleChangeH = (event, index) =>{
        let playerName = event.target.value
        let x = [...players]
        x[index]["name"]=playerName
        setPlayers(x)
    }

    const handleClickH = (event)=>{
        let newInput = {name: "", type: "H", level: 0}
        setPlayers((x)=>{
            return [...x, newInput]
        })
    }

    const remove = () =>{
        setPlayers((x)=>{
            return x.slice(0,-1)
        })
    }

    const playerform =  players.map((el, ind)=>{
        return (
            <input 
            key={ind} 
            name= "Player Name" 
            value = {el.name} 
            type="text" 
            placeholder={`Player ${ind+1} name`}
            onChange={e=>handleChangeH(e,ind)}/>

        )
    })

    
    return (
    <div className={styles.playerInfo}>
        {playerform}
        <div className="btn-toolbar">
        <button type="button" onClick={handleClickH}>Add Human</button>
        <button type="button">Add Computer</button>
        <button type="button" onClick={remove}>Remove</button>
        </div>
    </div>

    )
}

export default PlayerInfo