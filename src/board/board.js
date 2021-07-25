import React from "react"
import Square from "../Square/Square"
import Tile from "../Tile/Tile"
import styles from "./Board.module.css"
import { TWs, DWs, DLs, TLs, S } from "./BoardMarkings"


const renderSquare = (i, piece = null) => {
    let whichBgd = ""

    if (i === S) {
        whichBgd = "S"
    }
    if (TWs.includes(i)) {
        whichBgd = "TW"
    }
    if (DWs.includes(i)) {
        whichBgd = "DW"
    }
    if (TLs.includes(i)) {
        whichBgd = "TL"
    }
    if (DLs.includes(i)) {
        whichBgd = "DL"
    }
    return (
        <div key={i} className={styles.wrappingSquare} id={i.toString()}>
            <Square bgd={whichBgd}>{piece}</Square>
        </div>
    )
}

const Board = ({ tiles }) => {
    const squares = []
    for (let i = 0; i < 225; i++) {
        if (tiles.has(i)) {
            let piece = (
                <Tile letter={tiles.get(i)[0]} points={tiles.get(i)[1]} />
            )
            squares.push(renderSquare(i, piece))
        } else {
            squares.push(renderSquare(i))
        }
    }

    return <div className={styles.wrappingBoard}>{squares}</div>
}

export default Board
