import React from "react"
import Square from "../Square/Square"
import Tile from "../Tile/Tile"
import styles from "./Board.module.css"

const loc = (down,across) => { return 15*(down-1)+across-1}

const TWs = [loc(1,1), loc(1,8), loc(1,15), loc(8,1), loc(8,8), loc(8,15), loc(15,1), loc(15,8), loc(15,15)]
const DWs = [loc(2,2), loc(2,14), 
            loc(3,3), loc(3,13), 
            loc(4,4), loc(4,12), 
            loc(5,5), loc(5,11), 
            loc(11,5), loc(11,11)]
const TLs = [20, 24]
const S = 112

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
    return (
        <div key={i} className={styles.wrappingSquare}>
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
