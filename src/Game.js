import React, { useState } from "react"
import Board from "./Board/Board"


const TILE_LIST_ARR = [{pos: 5, letter: "A", points: 1},
{pos: 15, letter: "B", points: 2},
{pos: 58, letter: "P", points: 1},
{pos: 105, letter: "S", points: 1},
{pos: 106, letter: "E", points: 1},
{pos: 107, letter: "T", points: 1},
]
// const TILE_LIST_ARR = []

function arrayToMap(arr) {

    let amap = new Map()
    if (arr.length===0) { return amap}
    for (let el of arr) {
      amap.set(el.pos, [el.letter, el.points])
    }
    return amap
  }

const TILE_LIST = arrayToMap(TILE_LIST_ARR)

const Game = () => {
    const [tiles, setTiles] = useState(arrayToMap(TILE_LIST_ARR))
    

    return (
        <div>
            <Board tiles={tiles} />
        </div>
    )
}

export default Game
