import React, { useState } from 'react'
import styles from './TileEx.module.css'

const TileEx = ({letter, points }) => {
    const [selected, setSelected] = useState(false)
    const styling = selected ? `${styles.tile} ${styles.pushup}` : `${styles.tile}`

    const clickHandler =() =>{
        setSelected((x)=>!x)
    }
    return (
        <div className={styling} onClick={clickHandler}>
            <div className={styles.letter}>{letter}</div>
            <div className={styles.points}>{points}</div>
        </div>

    )

}

export default TileEx