import React from 'react'
import styles from './TileEx.module.css'

const TileEx = ({letter, points, clickHandler, selected }) => {
    const styling = selected ? `${styles.tile} ${styles.pushup}` : `${styles.tile}`

    return (
        <div onClick = {clickHandler} className={styling} >
            <div className={styles.letter}>{letter}</div>
            <div className={styles.points}>{points}</div>
        </div>

    )

}

export default TileEx