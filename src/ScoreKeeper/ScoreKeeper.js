import React from "react"
import { Table } from "react-bootstrap"
import styles from "./ScoreKeeper.module.css"



const scoreTable = (playersAndPoints, currentPlayer) =>{
    return (
        <Table bordered className={styles.mytable}>
            <tbody>
            {playersAndPoints.map((el, ind)=>{
                return 	(
                <tr style={ind==currentPlayer? {background:"yellow"}: null}>
                    <td key={"p"+ind}><span className={styles.bold}>{el.name}</span></td><td>{el.points}</td>
                </tr>
                )
            })}
            </tbody>
        </Table>
    )

}

const TilesAndPoints = ({tilesLeft, maxPoints}) =>{
    return (
        <div className={` ${styles['tpdiv']}`}>
        <div className={styles.tpbox}>Tiles Left: {tilesLeft}</div>
        <div className={styles.tpbox}>{maxPoints} point game</div>
      </div>
    )
}

const ScoreKeeper = (props) => {
    return (
        <div className={`d-flex flex-column`}>
            <div className={`p-1 mb-2 justify-content-center ${styles["pointsOuterBox"]}`}>
                    Points possible:{" "}
                    <span className={styles.bold}>{props.pointsPossible}</span>
            </div>
            <div className="p-1 mb-2 justify-content-center">
            {scoreTable(props.playersAndPoints, props.currentPlayer)}
            </div>
            <div className="p-1 mb-2 justify-content-center">
                <TilesAndPoints tilesLeft={props.tilesLeft} maxPoints={props.maxPoints}/>
            </div>
        </div>
    )
}

export default ScoreKeeper
