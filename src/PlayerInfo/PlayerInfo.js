import React, { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { shuffle } from "../Utils/helpers"
import styles from "./PlayerInfo.module.css"


const DUMMY_PLAYERS = [
    // {name: "", type: "", level: 0},
]

let AI_LIST = shuffle(["AI Lily", "AI Tori", "AI Parker", "AI Kira", "AI Jasmine", "AI Kashmir", "AI Dylan"])
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



    const handleClickM = (event)=>{
        let newInput = {name: AI_LIST.pop(), type: "M", level: 1}
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
        let u = el.level===0 ? 
        <input 
        key={ind} 
        name= "Player Name" 
        value = {el.name} 
        type="text" 
        placeholder={`Player ${ind+1} name`}
        onChange={e=>handleChangeH(e,ind)}/> : 

        <input 
        key={ind} 
        value = {el.name} 
        type="text" 
        disabled
        /> 
    
        return u 
        
    })

    
    return (
    <div className={styles.playerInfo}>
        {playerform}
        <div className="btn-toolbar">
        <button type="button" onClick={handleClickH}>Add Human</button>
        <button type="button" onClick={handleClickM}>Add Computer</button>
        <button type="button" onClick={remove}>Remove</button>
        </div>
    </div>

    )
}

export default PlayerInfo