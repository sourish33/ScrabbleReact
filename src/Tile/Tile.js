import React from 'react'
import styles from './Tile.module.css'

const Tile = (props) => {
    return (
        <div draggable = {props.submitted} className={styles.tile}                     
        onTouchStart = {props.submitted ? props.TouchStart : null}
        onTouchMove = {props.submitted ? props.TouchMove: null}
        onTouchEnd = {props.submitted ? props.TouchEnd: null}
        onDragStart={props.DragStart}
        onDragOver={props.DragOver}
        onDrop={props.Drop}
        >
            <div className={styles.letter}>{props.letter}</div>
            <div className={styles.points}>{props.points}</div>
        </div>

    )

}

export default Tile