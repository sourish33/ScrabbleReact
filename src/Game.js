import React, { useState } from "react"
import Board from './Board/Board'
import { TILE_LIST_MAP } from "./Utils/DummyData.js"

const Game = () => {
    const [tiles, setTiles] = useState(TILE_LIST_MAP)

    return (
        <div>
            <Board tiles={tiles} />
        </div>
    )
}

export default Game
