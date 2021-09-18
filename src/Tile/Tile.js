import React from 'react'
import styles from './Tile.module.css'

const Tile = (props) => {
    //the opposite of submitted is sent to this component from Board - could be refactored later
    let classes = styles['tile']
    if (props.boardTile) {
        classes = !props.submitted? `${styles['tile']} ${styles['submitted']}`: styles['tile']
    }

    const handleDoubleClick = (e) =>{
        // switch (e.detail) {
        //     case 2:
        //       console.log("double click");
        //       break;
        //     default:
        //         //do nothing
        //   }
        console.log('Double Click detected!!!!!')
    }

    return (
        <div draggable = {props.submitted} className={classes}                     
        onTouchStart = {props.submitted ? props.TouchStart : null}
        onTouchMove = {props.submitted ? props.TouchMove: null}
        onTouchEnd = {props.submitted ? props.TouchEnd: null}
        onDragStart={props.submitted ? props.DragStart: null}
        onDragOver={props.submitted ? props.DragOver: null}
        onDrop={props.submitted ? props.Drop: null}
        onDoubleClick = {props.submitted ? handleDoubleClick: null}
        >
            <div className={styles.letter}>{props.letter}</div>
            <div className={styles.points}>{props.points}</div>
        </div>

    )

}

export default Tile