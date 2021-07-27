import React, { useState } from "react"
import Board from "./Board/Board"
import { getUniqueInts } from "./Utils/helpers"

let arr=getUniqueInts(6)
const TILE_LIST_ARR = [
// {pos: 15*7+7, letter: "A", points: 1},
{pos: arr[5], letter: "A", points: 1},
{pos: arr[0], letter: "B", points: 2},
{pos: arr[1], letter: "P", points: 1},
{pos: arr[2], letter: "S", points: 1},
{pos: arr[3], letter: "E", points: 1},
{pos: arr[4], letter: "T", points: 1},
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
