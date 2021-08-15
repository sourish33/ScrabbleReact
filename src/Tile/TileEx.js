import React from 'react'
import styles from './TileEx.module.css'

const TileEx = ({letter, points, clickHandler }) => {
    const styling = `${styles.tile} ${styles.pushup}`

    return (
        <div onClick = {clickHandler} className={styling} >
            <div className={styles.letter}>{letter}</div>
            <div className={styles.points}>{points}</div>
        </div>

    )

}

export default TileEx