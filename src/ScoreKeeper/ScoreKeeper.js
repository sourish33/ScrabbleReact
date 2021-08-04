import React from "react"
import styles from "./ScoreKeeper.module.css"

const ScoreKeeper = (props) => {
    return (
        <div className={`d-flex flex-lg-column ${styles["horz-btns"]}`}>
            <div className={`p-1 mt-2 mb-2 justify-content-center ${styles["pointsOuterBox"]}`}>
                    Points possible:{" "}
                    <span className={styles.points}>{props.points}</span>
            </div>
        </div>
    )
}

export default ScoreKeeper
