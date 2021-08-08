import React, { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { shuffle } from "../Utils/helpers"
import styles from "./PlayerInfo.module.css"

const DUMMY_PLAYERS = [
    // {name: "", level: 0},
]

let AI_LIST = shuffle([
    "AI Lily",
    "AI Tori",
    "AI Parker",
    "AI Kira",
    "AI Jasmine",
    "AI Kashmir",
    "AI Dylan",
])
const PlayerInfo = () => {
    const [players, setPlayers] = useState(DUMMY_PLAYERS)

    const handleChange = (event, index) => {
        let playerName = event.target.value
        let x = [...players]
        x[index]["name"] = playerName
        setPlayers(x)
    }

    const handleSelect = (event, index) => {
        let playerLevel = event.target.value
        let x = [...players]
        x[index]["level"] = playerLevel
        setPlayers(x)

    }

    const handleClickH = (event) => {
        let newInput = { name: "", level: 0 }
        setPlayers((x) => {
            return [...x, newInput]
        })
    }

    const handleClickM = (event) => {
        let newInput = { name: AI_LIST.pop(), level: 1 }
        setPlayers((x) => {
            return [...x, newInput]
        })
    }

    const remove = () => {
        setPlayers((x) => {
            return x.slice(0, -1)
        })
    }

    const playerform = players.map((el, ind) => {
        let u =
            el.level === 0 ? (
                <input
                    key={ind}
                    name="Player Name"
                    value={el.name}
                    type="text"
                    placeholder={`Player ${ind + 1} name`}
                    onChange={(e) => handleChange(e, ind)}
                />
            ) : (
                <div key={ind}>
                    <input value={el.name} type="text" disabled />
                    <select name="level" onChange={(e)=>handleSelect(e,ind)}>
                        <option value="1">Weak</option>
                        <option value="2">Medium</option>
                        <option value="3">Strong</option>
                    </select>
                </div>
            )

        return u
    })

    return (
        // <div>
        <div className={styles.playerInfo}>
            {playerform}
            <div className="btn-toolbar">
                {players.length<4 ? (
                <button type="button" onClick={handleClickH}>
                    Add Human
                </button> ) : null}
                {players.length<4 ? (
                <button type="button" onClick={handleClickM}>
                    Add Computer
                </button> ) : null}
                
                {players.length!==0 ? <button type="button" onClick={remove}>
                    Remove
                </button> : null}
            </div>
            <div style={{ marginTop: 20 }}>
                {JSON.stringify(players, null, 2)}
            </div>
        </div>

        // </div>
    )
}

export default PlayerInfo
