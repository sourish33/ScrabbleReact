import React, { useState } from "react"
import Board from "./Board/Board"


// const TILE_LIST = new Map()
// TILE_LIST.set(5, ["P", 2])
// TILE_LIST.set(36, ["X", 10])
// TILE_LIST.set(20, ["A", 1])
// TILE_LIST.set(65, ["O", 1])
// TILE_LIST.set(174, ["K", 5])

// const TILE_LIST2 = new Map()
// TILE_LIST2.set(15, ["P", 2])
// TILE_LIST2.set(36, ["X", 10])
// TILE_LIST2.set(20, ["A", 1])
// TILE_LIST2.set(65, ["O", 1])
// TILE_LIST2.set(174, ["K", 5])

const TILE_LIST_ARR = [{pos: 5, letter: "A", points: 1},
{pos: 15, letter: "B", points: 2},
{pos: 58, letter: "P", points: 1},
{pos: 105, letter: "E", points: 1},
{pos: 106, letter: "X", points: 10}]
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
