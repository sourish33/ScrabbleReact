import React, { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { shuffle } from "../Utils/helpers"
import styles from "./GameInfo.module.css"

let AI_LIST = shuffle([
    "AI Lily",
    "AI Tori",
    "AI Parker",
    "AI Kira",
    "AI Jasmine",
    "AI Kashmir",
    "AI Dylan",
    "AI Sienna",
])
const GameInfo = ({ handleSubmit }) => {
    const [players, setPlayers] = useState([])
    const [shufflePlayers, setShufflePlayers] = useState("0")
    const [dictCheck, setDictCheck] = useState("1")
    const [gameType, setGameType] = useState("75")

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

    const handleSelectShuffle = (event) => {
        setShufflePlayers(event.target.value)
    }

    const handleSelectDictCheck = (event) => {
        setDictCheck(event.target.value)
    }

    const handleSelectGameType = (event) => {
        setGameType(event.target.value)
    }

    const handleClickHuman = (event) => {
        let newInput = { name: "", level: 0 }
        setPlayers((x) => {
            return [...x, newInput]
        })
    }

    const handleClickAI = (event) => {
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
                <div className="row mb-3">
                    <div className="col-6">
                    <input
                        key={ind}
                        name="Player Name"
                        className="form-control"
                        value={el.name}
                        type="text"
                        placeholder={`Player ${ind + 1} name`}
                        onChange={(e) => handleChange(e, ind)}
                    />
                    </div>
                </div>
            ) : (
                <div key={ind} className="row mb-3">
                    <div className="col-6">
                        <input value={el.name} type="text" className="form-control" disabled />
                    </div>
                    <div className={`col-3`}>
                        <select
                            className={styles.select}
                            name="level"
                            onChange={(e) => handleSelect(e, ind)}
                            value={el.level}
                            
                        >
                            <option value="1">Weak</option>
                            <option value="2">Medium</option>
                            <option value="3">Strong</option>
                        </select>
                    </div>
                </div>
            )

        return u
    })

    const ShouldShuffle = () => {
        return (
            <div className={styles.horz}>
                <div>Shuffle Players? </div>
                <div>
                    <select
                        className={styles.select}
                        name="shuffle"
                        onChange={handleSelectShuffle}
                        value={shufflePlayers}
                    >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
            </div>
        )
    }

    const ShouldCheckDict = () => {
        return (
            <div className={styles.horz}>
                <div>Dictionary Checking: </div>
                <div className="ml-4">
                    <select
                        name="shuffle"
                        onChange={handleSelectDictCheck}
                        value={dictCheck}
                        className={styles.select}
                    >
                        <option value="1">On</option>
                        <option value="0">Off</option>
                    </select>
                </div>
            </div>
        )
    }

    const GameType = () => {
        return (
            <div className={styles.horz}>
                <div>Dictionary Checking: </div>
                <div className="ml-4">
                    <select
                        name="shuffle"
                        onChange={handleSelectGameType}
                        value={gameType}
                    >
                        <option value="75">75 Point Game</option>
                        <option value="150">150 Point Game</option>
                        <option value="10000">Till The Tiles Run Out</option>
                    </select>
                </div>
            </div>
        )
    }



    return (
        <div>
            <form className="row g-3"
                onSubmit={(e) =>
                    handleSubmit(
                        e,
                        players,
                        shufflePlayers,
                        dictCheck,
                        gameType
                    )
                }
            >
                {playerform}
                <div className="btn-toolbar">
                    {players.length < 4 ? (
                        <button type="button" onClick={handleClickHuman}>
                            Add Human
                        </button>
                    ) : null}
                    {players.length < 4 ? (
                        <button type="button" onClick={handleClickAI}>
                            Add Computer
                        </button>
                    ) : null}

                    {players.length !== 0 ? (
                        <button type="button" onClick={remove}>
                            Remove
                        </button>
                    ) : null}
                </div>
                <ShouldShuffle />
                <ShouldCheckDict />
                <GameType />
                <button type="submit">Start Game</button>
            </form>
        </div>
    )
}

export default GameInfo
