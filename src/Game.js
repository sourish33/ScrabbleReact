import React, { useState } from "react"
import Board from './Board/Board'
import { TILE_LIST_ARR} from './Utils/DummyData'



const Game = () => {
    const [tiles, setTiles] = useState(TILE_LIST_ARR)

    const move = (origin, destination) =>{
      if (tiles.find(el=>{ return el.pos===destination})) {
        console.log("occupied spot")
        return
      }


      let whatsHere=tiles.find(el=>{ return el.pos===origin})
      setTiles((x)=>{
        x = x.filter((el)=>{return el.pos!==origin})
        return [...x, {pos: destination, letter: whatsHere.letter, points: whatsHere.points}]
      })

    }
    const DragStart = (event) => {
      let whereArtThou = event.target.parentElement.parentElement.id
      event.dataTransfer.setData("text/plain", whereArtThou)
      // console.log(event.target.parentElement.parentElement.id)
  }
  
  const DragOver = (event) => {
      event.preventDefault()
  }
  
  const Drop = (event) => {
      event.preventDefault()
      let incoming = parseInt(event.dataTransfer.getData("text"))
      let dest = parseInt(event.currentTarget.id)
      console.log(`${incoming} to ${dest}`)
      move(incoming, dest)
  }

    // const handleClick = (event) =>{
    
    //   let clickedSquareId=parseInt(event.currentTarget.id)
    //   let whatsHere=tiles.find(el=>{ return el.pos===clickedSquareId})
    //   if (!whatsHere) {
    //     console.log("Nothing here")
    //   } else {
    //     move(clickedSquareId, clickedSquareId+3)
    //   }

    // }

    return (
        <div>
            <Board 
            tiles={tiles} 
            DragStart={DragStart}
            DragOver={DragOver}
            Drop={Drop}/>
        </div>
    )
}

export default Game
