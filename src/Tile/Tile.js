import React from 'react'
import styles from './Tile.module.css'

const Tile = (props) => {
    //the opposite of submitted is sent to this component from Board - could be refactored later
    let classes = styles['tile']
    if (props.boardTile) {
        classes = !props.submitted? `${styles['tile']} ${styles['submitted']}`: styles['tile']
    }

    const handleSendBackClick = (e) =>{
        props.backToRack(e)
    }

    return (
        <div draggable = {props.submitted} className={classes}                     
        onTouchStart = {props.submitted ? props.TouchStart : null}
        onTouchMove = {props.submitted ? props.TouchMove: null}
        onTouchEnd = {props.submitted ? props.TouchEnd: null}
        onDragStart={props.submitted ? props.DragStart: null}
        onDragOver={props.submitted ? props.DragOver: null}
        onDrop={props.submitted ? props.Drop: null}
        onClick = {props.submitted ? handleSendBackClick: null}
        >
            <div className={styles.letter}>{props.letter}</div>
            <div className={styles.points}>{props.points}</div>
        </div>

    )

}

export default Tile