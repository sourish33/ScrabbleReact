import React, { useState } from "react"
import Board from "./Board/Board"
import { TILE_LIST_ARR } from "./Utils/DummyData"
import { formcheck } from "./Utils/helpers"
import { getSquareIdFromPos, getXY, setTranslate } from "./Utils/dragndropHelpers"

const Game = () => {
    const [tiles, setTiles] = useState(TILE_LIST_ARR)
    // console.log(tiles)

    const move = (origin, destination) => {
        if (!(formcheck(origin))){//checking origin
          console.log(`invalid origin ${origin}`)
          return
        }
        if (!(formcheck(destination))){//checking destination
          console.log(`invalid destination ${destination}`)
          return
        }
        if (origin === destination) {//checking that they are not the same
            console.log("Back to the same location")
            return
        }

        if (
            tiles.find((el) => {//checking if something exists are destination
                return el.pos === destination
            })
        ) {
            console.log("occupied spot")
            return
        }

        let whatsHere = tiles.find((el) => {//can't move if there is nothing to move
            return el.pos === origin
        })
        if (!whatsHere)
          {
            console.log(`Nothing at origin ${origin}`)
            return
        }
        
        setTiles((x) => {
            x = x.filter((el) => {//removing the entry from the origin
                return el.pos !== origin
            })
            return [//and adding it to the destination
                ...x,
                {
                    pos: destination,
                    letter: whatsHere.letter,
                    points: whatsHere.points,
                    submitted: whatsHere.submitted,
                },
            ]
        })
    }

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
        let dest = event.currentTarget.id
        move(incoming, dest)
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
      move(startingloc, endingloc)
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
        </div>
    )
}

export default Game
