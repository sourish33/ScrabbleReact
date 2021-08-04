import React from "react"
import { Button } from "react-bootstrap"
import styles from "./ControlButtons.module.css"

const ControlButtons = (props) => {
    return (
        <div className={`d-flex flex-lg-column ${styles["horz-btns"]}`}>
            <div class="p-2 mt-0">
                <Button variant="primary" disabled={props.disabled}>
                    Shuffle
                </Button>
            </div>
            <div class="p-2 mt-0">
                <Button variant="primary" disabled={props.disabled}>
                    Recall
                </Button>
            </div>
            <div class="p-2 mt-0">
                <Button variant="primary" disabled={props.disabled}>
                    Exchange
                </Button>
            </div>
            <div class="p-2 mt-0">
                <Button variant="warning" disabled={props.disabled}>
                    Pass
                </Button>
            </div>
            <div class="p-2 mt-0">
                <Button variant="info"><span className="d-none d-xl-block">Dictionary</span><span className="d-none d-sm-none">Dict</span></Button>
            </div>
            <div class="p-2 mt-0">
                <Button variant="success" disabled={props.disabled}>
                    Play
                </Button>
            </div>
        </div>
    )
}

export default ControlButtons
