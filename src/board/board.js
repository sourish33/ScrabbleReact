import React from "react"
import Square from "../Square/Square"
import Tile from "../Tile/Tile"

const Board = () => {
    return (
        <div>
            <Square>
                <Tile letter="P" points="3" />
            </Square>
        </div>
    )
}

export default Board
