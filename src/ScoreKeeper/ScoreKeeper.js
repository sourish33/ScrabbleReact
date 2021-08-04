import React from "react"
import { Table } from "react-bootstrap"
import styles from "./ScoreKeeper.module.css"



const table = (playersAndPoints) =>{
    return (
        <Table bordered className={styles.mytable}>
            <tbody>
            {playersAndPoints.map((el, ind)=>{
                return 	(
                <tr>
                    <td key={"p"+ind}><span className={styles.bold}>{el.name}</span></td><td><span id="points">{el.points}</span></td>
                </tr>
                )
            })}
            </tbody>
        </Table>
    )

}

const ScoreKeeper = (props) => {
    return (
        <div className={`d-flex flex-column`}>
            <div className={`p-1 mt-2 mb-2 justify-content-center ${styles["pointsOuterBox"]}`}>
                    Points possible:{" "}
                    <span className={styles.bold}>{props.points}</span>
            </div>
            <div className="p-1 mt-2 mb-2 justify-content-center">
            {table(props.playersAndPoints)}
            </div>
        </div>
    )
}

export default ScoreKeeper
