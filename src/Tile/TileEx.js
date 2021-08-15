import React from 'react'
import styles from './TileEx.module.css'

const TileEx = ({letter, points, clickHandler }) => {
    return (
        <div onClick = {clickHandler} className={`${styles.tile}`} >
            <div className={styles.letter}>{letter}</div>
            <div className={styles.points}>{points}</div>
        </div>

    )

}

export default TileEx