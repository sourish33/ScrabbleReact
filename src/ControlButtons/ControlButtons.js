import React from "react"
import { Button } from "react-bootstrap"
import styles from "./ControlButtons.module.css"

const ControlButtons = ({shuffleRack, recall, exchange, passTurn, lookup, play, disabled}) => {
    return (
        <div className={`d-flex flex-column ${styles["horz-btns"]}`}>
            <div  className="p-2 mt-0">
                <Button className={styles.stretch} variant="primary" onClick={shuffleRack} disabled={disabled}>
                <span className={styles.smallscreen}>Shuffle</span>
                </Button>
            </div>
            <div  className="p-2 mt-0">
                <Button className={styles.stretch} variant="primary" onClick={recall} disabled={disabled}>
                <span className={styles.smallscreen}>Recall</span>
                </Button>
            </div>
            <div className="p-2 mt-0">
                <Button className={styles.stretch} variant="primary" onClick={exchange} disabled={disabled}>
                <span className={styles.smallscreen}>Exch</span>
                </Button>
            </div>
            <div className="p-2 mt-0">
                <Button className={styles.stretch} variant="warning" onClick={passTurn} disabled={disabled}>
                <span className={styles.smallscreen}>Pass</span>  
                </Button>
            </div>
            <div className="p-2 mt-0">
                <Button className={styles.stretch} variant="info" onClick={lookup}><span className={styles.smallscreen}>Dict</span></Button>
            </div>
            <div className="p-2 mt-0">
                <Button className={styles.stretch} variant="success" onClick={play} disabled={disabled}>
                <span className={styles.smallscreen}>Play</span>
                </Button>
            </div>
        </div>
    )
}

export default ControlButtons
