import React from 'react';
import styles from './Rack.module.css'
import { arrayToMap } from '../Utils/helpers';
import Tile from '../Tile/Tile';
import RackSquare from '../RackSquare/RackSquare';


const Rack = ({whichRack, tiles, DragStart, DragOver, Drop, TouchStart, TouchMove, TouchEnd }) => {
    let tilesMap = arrayToMap(tiles)

    const squares = []
    for (let i = 1; i < 8; i++) {
        if (tilesMap.has(whichRack+i)) {
            let piece = (
                <Tile
                    letter={tilesMap.get(whichRack+i)[0]}
                    points={tilesMap.get(whichRack+i)[1]}
                    submitted={!tilesMap.get(whichRack+i)[2]}
                    TouchStart = {TouchStart}
                    TouchMove = {TouchMove}
                    TouchEnd = {TouchEnd}
                    DragStart={DragStart}
                    DragOver={DragOver}
                    Drop={Drop}
                />
            )
            let thisSquare = (
                <div
                    key={i}
                    className={styles.wrappingSquare}
                    id={whichRack+i}
                >
                     <RackSquare>{piece}</RackSquare>
                </div>
            )
            squares.push(thisSquare)
        } else {
            let thisSquare = (
                <div
                    key={i}
                    className={styles.wrappingSquare}
                    id={whichRack+i}
                    onDragOver={DragOver}
                    onDrop={Drop}
                >
                     <RackSquare></RackSquare>
                </div>
            )
            squares.push(thisSquare)
        }
    }

    return <div className={styles.wrappingRack}>{squares}</div>

}

export default Rack