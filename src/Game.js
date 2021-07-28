import React, { useState } from "react"
import Board from './Board/Board'
import { TILE_LIST_MAP } from "./Utils/DummyData.js"

const handleClick = (event) =>{

  console.log("Hi there! Game speaking")
  console.log(event.currentTarget.id)

}

const Game = () => {
    const [tiles, setTiles] = useState(TILE_LIST_MAP)

    return (
        <div>
            <Board tiles={tiles} handleClick={handleClick} />
        </div>
    )
}

export default Game
