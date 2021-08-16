import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Swal from "sweetalert2"
import BoardAndRack from "../BoardAndRack"
import ControlButtons from "../ControlButtons/ControlButtons"
import ScoreKeeper from "../ScoreKeeper/ScoreKeeper"
import { TILE_LIST_ARR, LAST_PLAYED } from "../Utils/DummyData"
import scrabbledict, { checkDict } from "../Utils/Dictionary/dictionary"
import { getUniqueInts, makePlayertable, randomUpTo, subtractArrays } from "../Utils/helpers"
import { emptyOnRack, recallTiles, shuffleRackTiles, tilesOnRack } from "./GameHelperFunctions"
import CheckDictionaryModal from "../CheckDictionaryModal/CheckDictionaryModal"
import tilesBag from "../Utils/tilesBag"
import ExchangeTilesModal from "../ExchangeTilesModal/ExchangeTilesModal"



const Game = ({ gameVariables, exitGame }) => {
    const [tiles, setTiles] = useState([])
    const [bag, setBag] = useState(tilesBag)
    const [showDict, setShowDict] = useState(false)
    const [showEx, setShowEx] = useState(false)
    const [whoseMove, setWhoseMove] = useState(1)
    const [visibleRack, setVisibleRack] = useState("p")
    const [lastPlayed, setLastPlayed] = useState(LAST_PLAYED)
    const [pointsPossible, setPointsPossible] = useState(0)
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [buttonsDisabled, setButtonsDisabled] = useState(false)
    const [selectedTiles, setSelectedTiles] = useState(new Set())

    //parsing incoming data from the welcome page
    const players = gameVariables.players
    const shufflePlayers = gameVariables.shufflePlayers
    const dictChecking = gameVariables.dictCheck
    const maxPoints = parseInt(gameVariables.gameType)
    const playerTable = makePlayertable(players, shufflePlayers)
    const [playersAndPoints, setPlayersAndPoints] = useState(playerTable)
    


    useEffect(() => {  
        replenishRack()
    }, [visibleRack])
///////////////////////// START EXCHANGE TILES MODAL///////////////////////////////////////
   
    const clickHandlerExt = (event) => {
        let clickedTileNo =visibleRack + event.currentTarget.parentNode.parentNode.id[1]
        
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
        recallTiles(tiles, visibleRack)
        setShowEx(true)
    }
    const hideModalEx = () =>{
        setSelectedTiles((x)=>{
            return new Set()
        })
        setShowEx(false)
    }

    
    const handleSubmit = () => {
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
        updateTiles(shuffleRackTiles(tiles, visibleRack))

    }
    const recall = () => {
        updateTiles(recallTiles(tiles, visibleRack))
    }



    const passTurn = () => {
        Swal.fire({
            icon: 'question',
            title: 'Passing',
            text: 'Are you sure about passing?',
          })
        
    }

    const lookup = () => {
        setShowDict(true)
    }

    const hideModal = () =>{
        setShowDict(false)
    }


    const play = () => {
        let tilesPlayedNotSubmitted = tiles.filter((el)=>{
            return el.pos[0]==="b" && !el.submitted
        })
        console.log("played not submitted")
        console.log(tilesPlayedNotSubmitted)
        let tilesNowSubmitted = []
        for (let tile of tilesPlayedNotSubmitted){
            tile.submitted = true
            tilesNowSubmitted.push(tile)
        }
        console.log("now submitted")
        console.log(tilesNowSubmitted)
        updateTiles([...subtractArrays(tiles,tilesPlayedNotSubmitted), ...tilesNowSubmitted])
        
    }

    const replenishRack = () => {
        let freeSlots = emptyOnRack(tiles, visibleRack)
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

    const returnToBag = (tilesToReturn) => {
        // let tilesToReturn = tilesOnRack(tiles, visibleRack)
        if (tilesToReturn.length===0){
            return
        }
        setTiles(subtractArrays(tiles, tilesToReturn))

        let srls = Array.from({length: 100}, (x, i) => i+1)
        let usedSrls = bag.map((el)=>el[0])
        let unusedSrls = subtractArrays(srls, usedSrls)

        let bagTiles = []
        for (let i=0;i<tilesToReturn.length;i++) {
            bagTiles.push([unusedSrls[i], tilesToReturn[i].letter, tilesToReturn[i].points])
        }
        // console.log(bagTiles)
        setBag(x=>[...bag, ...bagTiles])
    }

    const updateTiles = (newTiles) => {
        setTiles((x) => newTiles)
    }
    return (
        <>
        <CheckDictionaryModal show={showDict} onHide={hideModal} />
        <ExchangeTilesModal 
            show={showEx} 
            onHide={hideModalEx} 
            whichRack={visibleRack} 
            tiles={tiles} 
            clickHandlerExt={clickHandlerExt}
            handleSubmit={handleSubmit}
        />
            <Container>
                <Row>
                    <Col sm={12} lg={7} md={12}>
                        <BoardAndRack
                            tiles={tiles}
                            visibleRack={visibleRack}
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
