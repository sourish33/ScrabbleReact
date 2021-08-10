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
                        <tr
                            style={
                                ind === currentPlayer
                                    ? { background: "yellow" }
                                    : null
                            }
                        >
                            <td key={"p" + ind}>
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

const TilesAndPoints = ({ tilesLeft, maxPoints }) => {
    return (
        <div className={` ${styles["tpdiv"]}`}>
            <div className={styles.tpbox}>Tiles Left: {tilesLeft}</div>
            <div className={styles.tpbox}>{gameType(maxPoints)}</div>
        </div>
    )
}

const LastPlayed = ({ lastPlayed }) => {
    return (
        <div className={styles.lastPlayed}>
            {lastPlayed.map((el, ind) => {
                return (
                    <p key={ind} className={styles.nomargin}>
                        <span>{el.player}</span>:{" "}
                        <span className={styles.bluebold}>{el.word}</span> for{" "}
                        <span className={styles.bluebold}>{el.points}</span>
                    </p>
                )
            })}
        </div>
    )
}

const Buttons = ({exitGame}) => {
    return (
        <div className={`d-flex flex-row justify-content-center`}>
            <div class="p-2 mt-0">
                <Button variant="info">
                    <span className={styles.smallscreen}>Instructions</span>
                </Button>
            </div>
            <div class="p-2 mt-0">
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
