import React from "react"
import { Button } from "react-bootstrap"
import styles from "./ControlButtons.module.css"

const ControlButtons = (props) => {
    return (
            <div className={`d-flex flex-lg-column ${styles["horz-btns"]}`}  >
                <Button className="mt-2" variant="primary" disabled={props.disabled}>
                    Shuffle
                </Button>
                <Button className="mt-2" variant="primary" disabled={props.disabled}>
                    Recall
                </Button>
                <Button className="mt-2" variant="primary" disabled={props.disabled}>
                    Exchange
                </Button>
                <Button className="mt-2" variant="warning" disabled={props.disabled}>
                    Pass
                </Button>
                <Button className="mt-2" variant="info">
                    Dictionary
                </Button>
                <Button className="mt-2" variant="success" disabled={props.disabled}>
                    Play
                </Button>
            </div>
    )
}

export default ControlButtons
