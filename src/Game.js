import React, { useState } from "react"
import Board from "./Board/Board"

const Game = () => {
    const [tiles, setTiles] = useState(new Map())

    return (
        <div>
            <Board tiles={tiles} />
        </div>
    )
}

export default Game
