import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Swal from "sweetalert2"
import BoardAndRack from "../BoardAndRack"
import ControlButtons from "../ControlButtons/ControlButtons"
import ScoreKeeper from "../ScoreKeeper/ScoreKeeper"
import {LAST_PLAYED } from "../Utils/DummyData"
import {getUniqueInts, makePlayertable, subtractArrays, whichPlayer } from "../Utils/helpers"
import { emptyOnRack, getAllWords, readAllWords, recallTiles, shuffleRackTiles, } from "./GameHelperFunctions"
import CheckDictionaryModal from "../CheckDictionaryModal/CheckDictionaryModal"
import tilesBag from "../Utils/tilesBag"
import ExchangeTilesModal from "../ExchangeTilesModal/ExchangeTilesModal"
import PassDeviceMessageModal from "../PassDeviceMessageModal/PassDeviceMessageModal"
// import styles from '../Tile/Tile.module.css'



const Game = ({ gameVariables, exitGame }) => {
    const [tiles, setTiles] = useState([])
    const [bag, setBag] = useState(tilesBag)
    const [showDict, setShowDict] = useState(false)
    const [showEx, setShowEx] = useState(false)
    

    const [lastPlayed, setLastPlayed] = useState(LAST_PLAYED)
    const [pointsPossible, setPointsPossible] = useState(0)
    const [moveNumber, setMoveNumber] = useState(0)
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [buttonsDisabled, setButtonsDisabled] = useState(false)
    const [selectedTiles, setSelectedTiles] = useState(new Set())

    //parsing incoming data from the welcome page
    const players = gameVariables.players
    const shufflePlayers = gameVariables.shufflePlayers
    const dictChecking = gameVariables.dictCheck
    const maxPoints = parseInt(gameVariables.gameType)
    const playerTable = makePlayertable(players, shufflePlayers)
    const numPlayers = playerTable.length
    const [playersAndPoints, setPlayersAndPoints] = useState(playerTable)
    const [showPassDevice, setShowPassDevice] = useState(playersAndPoints[currentPlayer].level===0)


    useEffect(() => {  
        setCurrentPlayer(x => moveNumber%numPlayers)
        setShowPassDevice(playersAndPoints[currentPlayer].level===0)
        replenishRack()
    }, [moveNumber, currentPlayer])
///////////////////////// START EXCHANGE TILES MODAL///////////////////////////////////////
   
    const clickHandlerExt = (event) => {
        let clickedTileNo =playersAndPoints[currentPlayer].rack + event.currentTarget.parentNode.parentNode.id[1]
        
        setSelectedTiles((x) => {
            if (x.has(clickedTileNo)) {
                x.delete(clickedTileNo)
            } else {
                x.add(clickedTileNo)
            }
            return x
        })
        
    }
    const exchange = () => {
        recallTiles(tiles, playersAndPoints[currentPlayer].rack)
        setShowEx(true)
    }
    const hideModalEx = () =>{
        setSelectedTiles((x)=>{
            return new Set()
        })
        setShowEx(false)
    }

    const hideModalPassDevice = () => {
        setShowPassDevice(false)
    }

    
    const handleExchSubmit = () => {
        if (selectedTiles.size===0){return}
        //get the tiles to return to bag and covert them to the form {pos: p1, letter: J, points: 8} etc
        let toReturn = Array.from(selectedTiles)
        let tilesToReturn = []
        for (let id of toReturn) {
            tilesToReturn.push(tiles.filter((el)=>el.pos===id)[0])
        }
        //get rid of the modal
        hideModalEx()
        //get the tiles that would remain after deleting tilesTo Return 
        let tilesRemoved = subtractArrays(tiles, tilesToReturn)

        //assign serial numbers to these tiles before adding them to the bag
        let srls = Array.from({length: 100}, (x, i) => i+1)
        let usedSrls = bag.map((el)=>el[0])
        let unusedSrls = subtractArrays(srls, usedSrls)

        let bagTiles = []
        for (let i=0;i<tilesToReturn.length;i++) {
            bagTiles.push([unusedSrls[i], tilesToReturn[i].letter, tilesToReturn[i].points])
        }
        //this would be the state of the bag after adding the returned tiles to it
        let addToBag = [...bag, ...bagTiles]

        //now replenishing the array. Create a list of tiles to remove from the bag
        let removeFromBag =[]
        let addToTiles = []
        let inds = getUniqueInts(toReturn.length, bag.length-1)
        for (let i=0;i<toReturn.length;i++) {
            removeFromBag.push(bag[inds[i]])
            addToTiles.push({pos: toReturn[i], letter: bag[inds[i]][1], points: parseInt(bag[inds[i]][2]) })
        }
        //update the states
        setBag(x=>subtractArrays(addToBag, removeFromBag))
        updateTiles([...tilesRemoved, ...addToTiles])
        
    }
    /////////////////////////END EXCHANGE TILES MODAL///////////////////////////////////////

    const shuffleRack = () => {
        // Swal.fire("Shuffling rack")
        console.log("Shuffling Rack")
        updateTiles(shuffleRackTiles(tiles, playersAndPoints[currentPlayer].rack))

    }
    const recall = () => {
        updateTiles(recallTiles(tiles, playersAndPoints[currentPlayer].rack))
    }



    const passTurn = () => {
        console.log(readAllWords(getAllWords(tiles), tiles))  
    }

    const lookup = () => {
        setShowDict(true)
    }

    const hideModal = () =>{
        setShowDict(false)
    }


    const play = () => {

        //Change the subitted field to true
        let tilesPlayedNotSubmitted = tiles.filter((el)=>{
            return el.pos[0]==="b" && !el.submitted
        })
        let tilesNowSubmitted = []
        for (let tile of tilesPlayedNotSubmitted){
            tile.submitted = true
            tilesNowSubmitted.push(tile)
        }

        setMoveNumber(x=>x+1)
        
        updateTiles([...subtractArrays(tiles,tilesPlayedNotSubmitted), ...tilesNowSubmitted])
        //switch the setVisibleRack
        
    }

    const replenishRack = () => {
        let freeSlots = emptyOnRack(tiles, playersAndPoints[currentPlayer].rack)
        if (freeSlots.length===0) {return}
        let removeFromBag =[]
        let addToTiles = []
        let inds = getUniqueInts(freeSlots.length, bag.length-1)
        for (let i=0;i<freeSlots.length;i++) {
            removeFromBag.push(bag[inds[i]])
            addToTiles.push({pos: freeSlots[i], letter: bag[inds[i]][1], points: parseInt(bag[inds[i]][2]), submitted: false })
        }
        setBag(x=>subtractArrays(bag, removeFromBag))
        updateTiles([...tiles, ...addToTiles])
    }


    const updateTiles = (newTiles) => {
        setTiles((x) => newTiles)
    }
    return (
        <>
        <PassDeviceMessageModal show={showPassDevice} onHide = {hideModalPassDevice}/>
        <CheckDictionaryModal show={showDict} onHide={hideModal} />
        <ExchangeTilesModal 
            show={showEx} 
            onHide={hideModalEx} 
            whichRack={playersAndPoints[currentPlayer].rack} 
            tiles={tiles} 
            clickHandlerExt={clickHandlerExt}
            handleSubmit={handleExchSubmit}
        />
            <Container>
                <Row>
                    <Col sm={12} lg={7} md={12}>
                        <BoardAndRack
                            tiles={tiles}
                            visibleRack={playersAndPoints[currentPlayer].rack}
                            updateTiles={updateTiles}
                        ></BoardAndRack>
                    </Col>
                    <Col sm={12} lg={2} md={12}>
                        <ControlButtons
                            shuffleRack={shuffleRack}
                            recall ={recall}
                            exchange ={exchange}
                            passTurn ={passTurn}
                            lookup = {lookup}
                            play = {play}
                            disabled={buttonsDisabled}
                        />
                    </Col>
                    <Col sm={12} lg={3} md={12}>
                        <ScoreKeeper
                            pointsPossible={pointsPossible}
                            playersAndPoints={playersAndPoints}
                            currentPlayer={currentPlayer}
                            tilesLeft={bag.length}
                            maxPoints={maxPoints}
                            lastPlayed={lastPlayed}
                            exitGame={exitGame}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Game
