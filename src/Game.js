import React, { useState } from "react"
import Board from './Board/Board'
import { TILE_LIST_ARR} from './Utils/DummyData'



const Game = () => {
    const [tiles, setTiles] = useState(TILE_LIST_ARR)

    const move = (origin, destination) =>{
      if (tiles.find(el=>{ return el.pos===destination})) {
        //occupied spot
        return
      }
      let whatsHere=tiles.find(el=>{ return el.pos===origin})
      setTiles((x)=>{
        x = x.filter((el)=>{return el.pos!==origin})
        return [...x, {pos: destination, letter: whatsHere.letter, points: whatsHere.points}]
      })

    }

    const handleClick = (event) =>{
    
      let clickedSquareId=parseInt(event.currentTarget.id)
      let whatsHere=tiles.find(el=>{ return el.pos===clickedSquareId})
      if (!whatsHere) {
        console.log("Nothing here")
      } else {
        move(clickedSquareId, clickedSquareId+3)
      }

    }

    return (
        <div>
            <Board tiles={tiles} handleClick={handleClick} />
        </div>
    )
}

export default Game
