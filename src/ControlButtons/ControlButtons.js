import React from "react"
import { Button } from "react-bootstrap"
import styles from "./ControlButtons.module.css"

const ControlButtons = ({shuffleRack, lookup, disabled}) => {
    return (
        <div className={`d-flex flex-column ${styles["horz-btns"]}`}>
            <div key="1" className="p-2 mt-0">
                <Button className={styles.stretch} variant="primary" onClick={shuffleRack} disabled={disabled}>
                <span className={styles.smallscreen}>Shuffle</span>
                </Button>
            </div>
            <div key="2" className="p-2 mt-0">
                <Button className={styles.stretch} variant="primary" disabled={disabled}>
                <span className={styles.smallscreen}>Recall</span>
                </Button>
            </div>
            <div key="3" className="p-2 mt-0">
                <Button className={styles.stretch} variant="primary" disabled={disabled}>
                <span className={styles.smallscreen}>Exchange</span>
                </Button>
            </div>
            <div key="4" className="p-2 mt-0">
                <Button className={styles.stretch} variant="warning" disabled={disabled}>
                <span className={styles.smallscreen}>Pass</span>
                    
                </Button>
            </div>
            <div key="5" className="p-2 mt-0">
                <Button className={styles.stretch} variant="info" onClick={lookup}><span className={styles.smallscreen}>Dict</span></Button>
            </div>
            <div key="6" className="p-2 mt-0">
                <Button className={styles.stretch} variant="success" disabled={disabled}>
                <span className={styles.smallscreen}>Play</span>
                </Button>
            </div>
        </div>
    )
}

export default ControlButtons
