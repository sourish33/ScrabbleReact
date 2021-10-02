import React from "react"
import { Table, Button } from "react-bootstrap"
import styles from "./ScoreKeeper.module.css"


const gameType = (points) =>{
    return points===10000 ? "Till out of tiles" : `${points} point game`
}



const scoreTable = (playersAndPoints, currentPlayer) => {
    return (
        <Table bordered className={styles.mytable}>
            <tbody>
                {playersAndPoints.map((el, ind) => {
                    return (
                        <tr  key={"row" + ind}
                            style={
                                ind === currentPlayer
                                    ? { background: "yellow" }
                                    : null
                            }
                        >
                            <td>
                                <span className={styles.bold}>{el.name}</span>
                            </td>
                            <td>{el.points}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

const TilesAndPoints = ({ tilesLeft, maxPoints, dictChecking }) => {
    const dc=dictChecking ? "Dictionary checking ON" : "Dictionary checking OFF"
    return (
        <div className={` ${styles["tpdiv"]}`}>
            <div className={styles.tpbox}>Tiles Left: {tilesLeft}</div>
            <div className={styles.tpbox}>{gameType(maxPoints)}</div>
            <div className={styles.tpbox}>{dc}</div>
        </div>
    )
}

const LastPlayed = ({ lastPlayed }) => {
    if (lastPlayed.length >10) {
        lastPlayed = lastPlayed.slice(0,10)
    }
    return (
        lastPlayed.length===0 ? null :
        <div className={styles.lastPlayed}>
            {lastPlayed.map((el, ind) => {
                return (
                    <p key={ind} className={styles.nomargin}>
                        <span>{el.player}</span>:{" "}
                        <span className={styles.bluebold}>{el.word}</span> 
                        {el.word==="Passed" || el.word ==="Exchanged" ? <span></span> : <span className={styles.bluebold}> for {el.points}</span>}
                    </p>
                )
            })}
        </div>
    )
}

const Buttons = ({exitGame}) => {
    return (
        <div className={`d-flex flex-row justify-content-center`}>
            <div className="p-2 mt-0">
                <Button variant="info">
                    <span className={styles.smallscreen}>Instructions</span>
                </Button>
            </div>
            <div className="p-2 mt-0">
                <Button variant="danger" onClick={exitGame}>
                    <span className={styles.smallscreen}>Exit</span>
                </Button>
            </div>
        </div>
    )
}

const ScoreKeeper = (props) => {
    return (
        <div className={`d-flex flex-column`}>
            <div
                className={`p-1 mb-2 justify-content-center ${styles["pointsOuterBox"]}`}
            >
                Points possible:{" "}
                <span className={styles.bold}>{props.pointsPossible}</span>
            </div>
            <div className="p-1 mb-2 justify-content-center">
                {scoreTable(props.playersAndPoints, props.currentPlayer)}
            </div>
            <div className="p-1 mb-2 justify-content-center">
                <TilesAndPoints
                    tilesLeft={props.tilesLeft}
                    maxPoints={props.maxPoints}
                    dictChecking ={props.dictChecking}
                />
            </div>
            <div className="p-1 mb-2 justify-content-center">
                <LastPlayed lastPlayed={props.lastPlayed} />
            </div>
            <div className="p-1 mb-2 justify-content-center">
                <Buttons exitGame={props.exitGame}/>
            </div>

        </div>
    )
}

export default ScoreKeeper
