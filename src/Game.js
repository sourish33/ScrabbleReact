import React, { useState } from "react"
import Board from "./Board/Board"
import { TILE_LIST_ARR } from "./Utils/DummyData"

const Game = () => {
    const [tiles, setTiles] = useState(TILE_LIST_ARR)

    const move = (origin, destination) => {
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
  // if (whatshere.length === 0) {
  //     return "none"
  // }
  let idshere = whatshere.map((el)=>el.id)
  console.log(idshere)
  // for (let stuffHere of whatshere) {
  //     let stuff_id = stuffHere.id
  //     if (/^[^pqrtuvwxyz]\d+$/.test(stuff_id)) {
  //         return stuff_id
  //     }
  // }
  // return "none"
}

const getXY = (space_id) => {
  let el
  if (typeof space_id === "string") {
      el = document.getElementById(space_id)
  } else {
      el = space_id
  }
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
      console.log("Touchstart speaking.")
      // console.log(u)
      // console.log(getXY(u))
      initialX = e.touches[0].clientX - xOffset
      initialY = e.touches[0].clientY - yOffset
      console.log(getSquareIdFromPos(getXY(u)))
    }

    const TouchMove = (e) => {
      e.preventDefault()
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
      console.log("Touchend speaking")
      console.log(u)
      console.log(getSquareIdFromPos(getXY(u)))
      console.log(`[${currentX}, ${currentY}]`)
      xOffset = 0
      yOffset = 0
      setTranslate(0, 0, lastMoved)
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
                Drop={Drop}
                TouchStart = {TouchStart}
                TouchMove = {TouchMove}
                TouchEnd = {TouchEnd}
            />
        </div>
    )
}

export default Game
