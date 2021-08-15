import React from 'react'
import styles from './TileEx.module.css'

const TileEx = ({letter, points }) => {
    return (
        <div className={`${styles.tile}`} >
            <div className={styles.letter}>{letter}</div>
            <div className={styles.points}>{points}</div>
        </div>

    )

}

export default TileEx