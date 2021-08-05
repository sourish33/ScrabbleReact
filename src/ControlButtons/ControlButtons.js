import React from "react"
import { Button } from "react-bootstrap"
import styles from "./ControlButtons.module.css"

const ControlButtons = (props) => {
    return (
        <div className={`d-flex flex-column ${styles["horz-btns"]}`}>
            <div class="p-2 mt-0">
                <Button className={styles.stretch} variant="primary" disabled={props.disabled}>
                <span className={styles.smallscreen}>Shuffle</span>
                </Button>
            </div>
            <div class="p-2 mt-0">
                <Button className={styles.stretch} variant="primary" disabled={props.disabled}>
                <span className={styles.smallscreen}>Recall</span>
                </Button>
            </div>
            <div class="p-2 mt-0">
                <Button className={styles.stretch} variant="primary" disabled={props.disabled}>
                <span className={styles.smallscreen}>Exchange</span>
                </Button>
            </div>
            <div class="p-2 mt-0">
                <Button className={styles.stretch} variant="warning" disabled={props.disabled}>
                <span className={styles.smallscreen}>Pass</span>
                    
                </Button>
            </div>
            <div class="p-2 mt-0">
                <Button className={styles.stretch} variant="info"><span className={styles.smallscreen}>Dict</span></Button>
            </div>
            <div class="p-2 mt-0">
                <Button className={styles.stretch} variant="success" disabled={props.disabled}>
                <span className={styles.smallscreen}>Play</span>
                </Button>
            </div>
        </div>
    )
}

export default ControlButtons
