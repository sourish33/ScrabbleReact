import React from 'react'
import styles from './TileEx.module.css'

const TileEx = (props) => {
    return (
        <div className={styles.tile} >
            <div className={styles.letter}>{props.letter}</div>
            <div className={styles.points}>{props.points}</div>
        </div>

    )

}

export default TileEx