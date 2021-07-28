import React, { useState } from "react"
import Board from './Board/Board'
import { TILE_LIST_ARR} from './Utils/DummyData'



const Game = () => {
    const [tiles, setTiles] = useState(TILE_LIST_ARR)

    const handleClick = (event) =>{
    
      let clickedSquareId=parseInt(event.currentTarget.id)
      let whatsHere=tiles.find(el=>{ return el.pos===clickedSquareId})
      if (!whatsHere) {
        console.log("Nothing here")
      } else {
        // console.log(`Deleting ${whatsHere.letter}`)
        setTiles((x)=>{
          x = x.filter((el)=>{return el.pos!==clickedSquareId})
          return [...x, {pos: clickedSquareId+1, letter: whatsHere.letter, points: whatsHere.points}]
        })
      }

    }

    return (
        <div>
            <Board tiles={tiles} handleClick={handleClick} />
        </div>
    )
}

export default Game
