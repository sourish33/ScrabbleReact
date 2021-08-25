import React from "react"
import { Image } from "react-bootstrap"
import victory1 from "../Assets/victory1.gif"
import styles from "./VictoryModal.module.css"

const VictoryModal = ({ show, winner }) => {
    return (
        <>
            {show && (
                <div className={styles.victorybox}>
                    <div>
                        <span className={styles.close}>
                            &times;
                        </span>
                    </div>
                    <div  className={styles.victory}>
                        <h1>
                            <span>{winner}</span> has won!!!
                        </h1>
                    </div>
                    <div>
                        <Image src={victory1} fluid alt="nope"/>
                    </div>
                </div>
            )}
        </>
    )
}

export default VictoryModal
