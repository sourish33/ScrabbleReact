import React, { useState } from "react"
import Board from "./Board/Board"
import { TILE_LIST_ARR } from "./Utils/DummyData"
import { formcheck } from "./Utils/helpers"
import move from "./Utils/movers"
import { getSquareIdFromPos, getXY, setTranslate } from "./Utils/dragndropHelpers"
import Rack from "./Rack/Rack"

const Game = () => {
    const [tiles, setTiles] = useState(TILE_LIST_ARR)
    // console.log(tiles)
    const[visibleRack, setVisibleRack]=useState("p")

    let startingloc=""
    let endingloc=""
    let initialX
    let initialY 
    let xOffset =0
    let yOffset =0
    let lastMoved
    let currentX
    let currentY

    const DragStart = (event) => {
        let whereArtThou = event.target.parentElement.parentElement.id
        event.dataTransfer.setData("text/plain", whereArtThou)
        // console.log(whereArtThou)
    }

    const DragOver = (event) => {
        event.preventDefault()
    }

    const Drop = (event) => {
        event.preventDefault()
        let incoming = event.dataTransfer.getData("text")
        // let dest = event.currentTarget.id
        let u = event.currentTarget
        let dest= getSquareIdFromPos(getXY(u))
        console.log(`${incoming} to ${dest}`)
        setTiles(tiles=>move(incoming, dest,tiles))
    }



    const TouchStart =(e) => {
      e.preventDefault()
      if (e.touches.length>1) {return}//Multiple Touches
      document.getElementsByTagName("body")[0].style.touchAction = "none"
      let u = e.currentTarget
      initialX = e.touches[0].clientX - xOffset
      initialY = e.touches[0].clientY - yOffset
      startingloc = getSquareIdFromPos(getXY(u))
    }

    const TouchMove = (e) => {
      e.preventDefault()
      if (e.touches.length>1) {return}//Multiple Touches
      document.getElementsByTagName("body")[0].style.touchAction = "none"
      let dragItem = e.currentTarget
      lastMoved = dragItem
  
      currentX = e.touches[0].clientX - initialX
      currentY = e.touches[0].clientY - initialY
  
      xOffset = currentX
      yOffset = currentY
  
      setTranslate(currentX, currentY, dragItem)
    }

    function TouchEnd(e) {
      e.preventDefault()
      if (e.touches.length>1) {return}//Multiple Touches
      initialX = currentX
      initialY = currentY
      let u = e.currentTarget
      endingloc = getSquareIdFromPos(getXY(u))
      xOffset = 0
      yOffset = 0
      setTranslate(0, 0, lastMoved)
      setTiles(tiles => move(startingloc, endingloc, tiles))
      document.getElementsByTagName("body")[0].style.touchAction = "auto"
  }


    return (
        <div>
            <Board
                tiles={tiles}
                DragStart={DragStart}
                DragOver={DragOver}
                Drop={Drop}
                TouchStart = {TouchStart}
                TouchMove = {TouchMove}
                TouchEnd = {TouchEnd}
            />
            <Rack
                whichRack={visibleRack}
                tiles={tiles}
                DragStart={DragStart}
                DragOver={DragOver}
                Drop={Drop}
                TouchStart = {TouchStart}
                TouchMove = {TouchMove}
                TouchEnd = {TouchEnd}
            />
        </div>
    )
}

export default Game
