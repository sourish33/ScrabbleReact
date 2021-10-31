import React from "react"
import { Image } from "react-bootstrap"
import {shuffle } from "../Utils/helpers"
// import victory1 from "../Assets/Images/victory1.gif"
import styles from "./VictoryModal.module.css"

const VictoryModal = ({ show, winner, onClickClose }) => {

    const images = [
        require('../Assets/Images/dancingdino.gif').default,
        require('../Assets/Images/dinoscream.gif').default,
        require('../Assets/Images/dinodance.gif').default,
    ]
    const shuffledImages = shuffle(images)


    return (
        <>
            {show && (
                <div className={styles.victorybox}>
                    <div>
                        <span className={styles.close} onClick={onClickClose}>
                            &times;
                        </span>
                    </div>
                    <div  className={styles.victory}>
                        <h1>
                            <span>{winner}</span> has won!!!
                        </h1>
                    </div>
                    <div>
                        <Image src={shuffledImages[0]} fluid alt="nope"/>
                    </div>
                </div>
            )}
        </>
    )
}

export default VictoryModal
