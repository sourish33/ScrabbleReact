import React, { useState } from "react"
import Board from "./Board/Board"
import { TILE_LIST_ARR } from "./Utils/DummyData"
import { formcheck } from "./Utils/helpers"

const Game = () => {
    const [tiles, setTiles] = useState(TILE_LIST_ARR)
    // console.log(tiles)

    const move = (origin, destination) => {
        if (!(formcheck(origin))){
          console.log(`invalid origin ${origin}`)
          return
        }
        if (!(formcheck(destination))){
          console.log(`invalid destination ${destination}`)
          return
        }
        if (origin === destination) {
            console.log("Back to the same location")
            return
        }

        if (
            tiles.find((el) => {
                return el.pos === destination
            })
        ) {
            console.log("occupied spot")
            return
        }

        let whatsHere = tiles.find((el) => {
            return el.pos === origin
        })
        if (!whatsHere)
          {
            console.log(`Nothing at origin ${origin}`)
            return
        }
        
        setTiles((x) => {
            x = x.filter((el) => {
                return el.pos !== origin
            })
            return [
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
        console.log(`${incoming} to ${dest}`)
        move(incoming, dest)
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

    
const getSquareIdFromPos = (pos) => {
  let x = pos[0]
  let y = pos[1]
  let whatshere = document.elementsFromPoint(x, y)
  if (whatshere.length === 0) {
      return ""
  }

  let idshere = whatshere.map(el=>el.id)
  for (let id of idshere) {
      if (formcheck(id)) {
          return id
      }
  }
  // return "none"
}

const getXY = (el) => {
  let rect = el.getBoundingClientRect()
  let posX = (rect.left + rect.right) / 2
  let posY = (rect.top + rect.bottom) / 2
  return [posX, posY]
}

    const setTranslate = (xPos, yPos, el) => {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)"
  }
    const TouchStart =(e) => {
      let u = e.currentTarget
      initialX = e.touches[0].clientX - xOffset
      initialY = e.touches[0].clientY - yOffset
      startingloc = getSquareIdFromPos(getXY(u))

      // console.log(startingloc)
    }

    const TouchMove = (e) => {
      // e.preventDefault()
      let dragItem = e.currentTarget
      lastMoved = dragItem
  
      currentX = e.touches[0].clientX - initialX
      currentY = e.touches[0].clientY - initialY
  
      xOffset = currentX
      yOffset = currentY
  
      setTranslate(currentX, currentY, dragItem)
    }

    function TouchEnd(e) {
      initialX = currentX
      initialY = currentY
      let u = e.currentTarget
      // console.log("Touchend speaking")
      
      endingloc = getSquareIdFromPos(getXY(u))
      console.log(endingloc)
      console.log(`[${startingloc} to ${endingloc}]`)
      xOffset = 0
      yOffset = 0
      setTranslate(0, 0, lastMoved)
      move(startingloc, endingloc)
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
