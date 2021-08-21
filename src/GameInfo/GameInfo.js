import React, { useState } from "react"
import { randomUpTo, shuffle, subtractArrays } from "../Utils/helpers"
import styles from "./GameInfo.module.css"

let AI_LIST = [
    "AI Lily",
    "AI Tori",
    "AI Parker",
    "AI Kira",
    "AI Jasmine",
    "AI Kashmir",
    "AI Dylan",
    "AI Sienna",
]
const GameInfo = ({ handleSubmit }) => {
    const [players, setPlayers] = useState([])
    const [shufflePlayers, setShufflePlayers] = useState("0")
    const [dictCheck, setDictCheck] = useState(true)
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
        let val = event.target.value=== "1" ? true : false 
        setDictCheck(val)
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
        let currentAIs = players.filter((el)=>{
           return el.level>0
        })
        let currrentAInames = currentAIs.map(el=>el.name)
        let unusedAIs = subtractArrays(AI_LIST, currrentAInames)
        let newInput = { name: unusedAIs[randomUpTo(unusedAIs.length-1)], level: 1 }//pick a random AI name that hsnt been used
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
                <div key={ind} className="row mb-3">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <input
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
                            <option key="W" value="1">Weak</option>
                            <option key="M" value="2">Medium</option>
                            <option key="S" value="3">Strong</option>
                        </select>
                    </div>
                </div>
            )

        return u
    })

    const ShouldShuffle = () => {
        return (
            <div className="row mb-3">
                <div className="col-6">Shuffle Players? </div>
                <div className="col-6">
                    <select
                        className={styles.select}
                        name="shuffle"
                        onChange={handleSelectShuffle}
                        value={shufflePlayers}
                    >
                        <option key="N" value="1">No</option>
                        <option key="Y" value="0">Yes</option>
                    </select>
                </div>
            </div>
        )
    }

    const ShouldCheckDict = () => {
        return (
            <div className="row mb-3">
                <div className="col-6">Dictionary Checking: </div>
                <div className="col-6">
                    <select
                        className={styles.select}
                        name="shuffle"
                        onChange={handleSelectDictCheck}
                        value={dictCheck}
                    >
                        <option key="on" value="1">On</option>
                        <option key="off" value="0">Off</option>
                    </select>
                </div>
            </div>
        )
    }

    const GameType = () => {
        return (
            <div className="row mb-3">
                <div className="col-6">Game Type: </div>
                <div className="col-6">
                    <select
                        className={styles.select}
                        name="shuffle"
                        onChange={handleSelectGameType}
                        value={gameType}
                    >
                        <option key="75" value="75">75 Point Game</option>
                        <option key="150" value="150">150 Point Game</option>
                        <option key="inf" value="10000">Till The Tiles Run Out</option>
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
                {players.length>0 ? 
                <div className={`${styles.card} ${styles.shadow2} col-lg-6 col-sm-12 col-md-6`}>
                    {playerform}
                </div> : null }
                <div className="btn-toolbar">
                    {players.length < 4 ? (
                        <button className = {`btn btn-primary btn-lg ${styles["spacer-right"]}`} type="button" onClick={handleClickHuman}>
                            Add Human
                        </button>
                    ) : null}
                    {players.length < 4 ? (
                        <button className = {`btn btn-primary btn-lg ${styles["spacer-right"]}`} type="button" onClick={handleClickAI}>
                            Add Computer
                        </button>
                    ) : null}

                    {players.length !== 0 ? (
                        <button className = {`btn btn-primary btn-lg ${styles["spacer-right"]}`} type="button" onClick={remove}>
                            Remove
                        </button>
                    ) : null}
                </div>
                <div className={`${styles.card} ${styles.shadow2} col-lg-6 col-sm-12 col-md-6`}>
                <ShouldShuffle />
                <ShouldCheckDict />
                <GameType />
                </div>
                <div className="btn-toolbar">
                {players.length >1 ? (
                <button className = {`btn btn-primary btn-lg ${styles["spacer-right"]}`} type="submit">Start Game</button>
                ) : null}
                <button className = {`btn btn-info btn-lg `} type="button">Help</button>
                </div>
            </form>
        </div>
    )
}

export default GameInfo
