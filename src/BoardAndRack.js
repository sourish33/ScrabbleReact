import React  from "react"
import Board from "./Board/Board"
import styles from "./BoardAndRack.module.css"
import {emptyOnRack} from "./Game/GameHelperFunctions"

import move from "./Utils/movers"
import {
    getSquareIdFromPos,
    getXY,
    setTranslate,
} from "./Utils/dragndropHelpers"
import Rack from "./Rack/Rack"

const BoardAndRack = ({ tiles, visibleRack, updateTiles, showTiles }) => {
    

    let startingloc = ""
    let endingloc = ""
    let initialX
    let initialY
    let xOffset = 0
    let yOffset = 0
    let lastMoved
    let currentX
    let currentY

    const doubleClick = (e) =>{
        let u = e.currentTarget
        let src = getSquareIdFromPos(getXY(u))
        if (src[0]!=='b'){
            console.log(`You clicked on ${src}, rack tile doing nothing`)
            return
        }
        let emptySpots = emptyOnRack(tiles, visibleRack)
        if (emptySpots.length ===0){
            console.log("No space on rack")
            return 
        }
        let dest = emptySpots[0]
        updateTiles(move(src, dest, tiles))
    }

    const DragStart = (event) => {
        let whereArtThou = event.target.parentElement.parentElement.id
        event.dataTransfer.setData("text/plain", whereArtThou)
    }

    const DragOver = (event) => {
        event.preventDefault()
    }

    const Drop = (event) => {
        event.preventDefault()
        let incoming = event.dataTransfer.getData("text")
        // let dest = event.currentTarget.id
        let u = event.currentTarget
        let dest = getSquareIdFromPos(getXY(u))
        console.log(`${incoming} to ${dest}`)
        updateTiles(move(incoming, dest, tiles))
    }

    const TouchStart = (e) => {
        e.preventDefault()
        if (e.touches.length > 1) {
            return
        } //Multiple Touches
        document.getElementsByTagName("body")[0].style.touchAction = "none"
        let u = e.currentTarget
        initialX = e.touches[0].clientX - xOffset
        initialY = e.touches[0].clientY - yOffset
        startingloc = getSquareIdFromPos(getXY(u))
    }

    const TouchMove = (e) => {
        e.preventDefault()
        if (e.touches.length > 1) {
            return
        } //Multiple Touches
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
        if (e.touches.length > 1) {
            return
        } //Multiple Touches
        initialX = currentX
        initialY = currentY
        let u = e.currentTarget
        endingloc = getSquareIdFromPos(getXY(u))
        xOffset = 0
        yOffset = 0
        setTranslate(0, 0, lastMoved)
        if (startingloc === endingloc){//return tile to rack upon tapping a played-not-submitted tile
            doubleClick(e)
        } else{
            updateTiles(move(startingloc, endingloc, tiles))
        }
        document.getElementsByTagName("body")[0].style.touchAction = "auto"
    }




    return (
        <div className ={styles.center}>
            <Board
                tiles={tiles}
                DragStart={DragStart}
                DragOver={DragOver}
                Drop={Drop}
                TouchStart={TouchStart}
                TouchMove={TouchMove}
                TouchEnd={TouchEnd}
                doubleClick = {doubleClick}
            />
            <Rack
                whichRack={visibleRack}
                tiles={tiles}
                DragStart={DragStart}
                DragOver={DragOver}
                Drop={Drop}
                TouchStart={TouchStart}
                TouchMove={TouchMove}
                TouchEnd={TouchEnd}
                showTiles={showTiles}
                doubleClick = {doubleClick}
            />
        </div>
    )
}

export default BoardAndRack

