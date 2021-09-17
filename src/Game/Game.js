import React, { useEffect, useReducer, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Swal from "sweetalert2"
import BoardAndRack from "../BoardAndRack"
import ControlButtons from "../ControlButtons/ControlButtons"
import ScoreKeeper from "../ScoreKeeper/ScoreKeeper"
import { b_coords, getUniqueInts0, makePlayertable, subtractArrays } from "../Utils/helpers"
import { checkLegalPlacement, emptyOnRack, getAllNewWords, longestNewWord, rackPoints,  readWord, recallTiles, score, shuffleRackTiles,  tilesOnBoard,  tilesOnRack, tilesPlayedNotSubmitted } from "./GameHelperFunctions"
import CheckDictionaryModal from "../CheckDictionaryModal/CheckDictionaryModal"
import tilesBag from "../Utils/tilesBag"
import ExchangeTilesModal from "../ExchangeTilesModal/ExchangeTilesModal"
import PassDeviceMessageModal from "../PassDeviceMessageModal/PassDeviceMessageModal"
import { randomUpTo } from "../Utils/helpers"
import { passGreetings } from "../Utils/DummyData"
import VictoryModal from "../VictoryModal/VictoryModal"
import { aiMove, evaluateMove, evaluateMoves, makeAllSlots, makeRackPerms } from "./AIHelperFunctions"




const Game = ({ gameVariables, exitGame }) => {
    const [tiles, setTiles] = useState([])
    const [bag, setBag] = useState(tilesBag)
    const [showDict, setShowDict] = useState(false)
    const [showEx, setShowEx] = useState(false)
    

    const [lastPlayed, setLastPlayed] = useState([])
    const [pointsPossible, setPointsPossible] = useState(0)
    const [buttonsDisabled, setButtonsDisabled] = useState(false)
    const [selectedTiles, setSelectedTiles] = useState(new Set())

    //parsing incoming data from the welcome page
    const players = gameVariables.players
    const shufflePlayers = gameVariables.shufflePlayers
    const dictChecking =  gameVariables.dictCheck === "1" ? true : false 
    const maxPoints = parseInt(gameVariables.gameType)
    const playerTable = makePlayertable(players, shufflePlayers)
    const numPlayers = playerTable.length
    const AIPlayersExist = playerTable.filter((el)=>el.level>0).length>0//whether AI players exist
    const [playersAndPoints, setPlayersAndPoints] = useState(playerTable)
    const [showPassDevice, setShowPassDevice] = useState(playersAndPoints[0].level===0)
    const [greeting, setGreeting] = useState("")
    const [showVictoryBox, setShowVictoryBox] = useState(false)
    

    const gsreducer = (state, action) => {
        switch(action.type) {
            case "ADVANCE":
                return {
                    ...state, 
                    mn : state.mn+1,
                    cp : (state.mn+1)%numPlayers
                }
            default:
                return state
        }
    }
    const initialState = {mn: 0, cp: 0}
    const [gameState, dispatch] = useReducer(gsreducer, initialState)
    const advanceGameState = () => {
        dispatch({ type: 'ADVANCE' });
      }
    


    useEffect(() => { 
        if (gameOver()){
            return
        } 
        const {mn: moveNumber, cp: currentPlayer}  = gameState

        if (greeting!=="Better Luck Next Time!") {
            moveNumber===0 ? setGreeting("Lets Get Started!") : setGreeting(passGreetings[randomUpTo(passGreetings.length-1)])
        }
        setShowPassDevice(x=>{
            return !AIPlayersExist && playersAndPoints[currentPlayer].level===0})

        if (playersAndPoints[currentPlayer].level>0){
            aiReplenishRack1().then((newTiles)=>delay(1000, newTiles).then((newTiles)=>aiPlay(newTiles)))
            return
        }
        replenishRack()
        
    }, [gameState])


    useEffect(()=>{
        const {mn: moveNumber, cp: currentPlayer}  = gameState
        checkLegalPlacement(tiles, false) ? setPointsPossible(x=>score(tiles, playersAndPoints[currentPlayer].rack)) : setPointsPossible(x=>0)

    }, [tiles])

    ////////START GAME OVER FUNCTION//////////

    const gameOver = () => { //a player has reached or exceeded max points  
        const {mn: moveNumber, cp: currentPlayer}  = gameState
        const prevPlayer = Math.max((moveNumber-1)%numPlayers, 0)
        if (parseInt(playersAndPoints[prevPlayer].points) >= maxPoints){
            setShowVictoryBox(x=>true)
            setButtonsDisabled(x=>true)
            //disabling tiles still on rack
            disableRack()
            return true
        }
        ///////
        if (bag.length===0){//no tiles left
            let playersAndPointsCopy = Array.from(playersAndPoints)
            for (let i =0; i<playersAndPointsCopy.length; i++){
                playersAndPointsCopy[i].points -= rackPoints(playersAndPointsCopy[i].rack, tiles)
            }
            setPlayersAndPoints(playersAndPointsCopy)
            setShowVictoryBox(x=>true)
            setButtonsDisabled(x=>true)
            disableRack()
            return true

        }


        return false
    }

    ///////END GAME OVER FUNCTION///////////////

///////////////////////// START EXCHANGE TILES MODAL///////////////////////////////////////
   
    const clickHandlerExt = (event) => {
        let clickedTileNo =playersAndPoints[gameState.cp].rack + event.currentTarget.parentNode.parentNode.id[1]
        
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
        const {mn: moveNumber, cp: currentPlayer}  = gameState
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
        setGreeting("")
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
        setGreeting("Better Luck Next Time!")
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
        let inds = getUniqueInts0(toReturn.length, bag.length)
        for (let i=0;i<toReturn.length;i++) {
            removeFromBag.push(bag[inds[i]])
            addToTiles.push({pos: toReturn[i], letter: bag[inds[i]][1], points: parseInt(bag[inds[i]][2]), submitted: playersAndPoints[gameState.cp].level>0 })
        }
        //update the states
        setBag(x=>subtractArrays(addToBag, removeFromBag))
        updateTiles([...tilesRemoved, ...addToTiles])
        advanceGameState()
    }
    /////////////////////////END EXCHANGE TILES MODAL///////////////////////////////////////

    const disableRack = () => {
        const {cp: currentPlayer}  = gameState
        let tr = tilesOnRack(tiles, playersAndPoints[currentPlayer].rack)
        if (tr.length>0){
            let tilesOnRackDisabled = []
            for (let tile of tr){
                tile.submitted = true
                tilesOnRackDisabled.push(tile)
            }
            updateTiles([...subtractArrays(tiles,tr), ...tilesOnRackDisabled])
        }
    }


    //////START AI PLAY GROUP///////////////////////////////////////////

    const moveNPlay = (moves, theTiles) =>{
        return new Promise ((resolve, reject)=>{
            let starts = moves[0].rackPerm
            let ends = moves[0].slot
            let letter = moves[0].letter
            setTiles(tiles=>aiMove(starts, ends, letter, theTiles))
            resolve(aiMove(starts, ends, letter, theTiles))
        })
    }

    function delay(t, v) {
        return new Promise(function(resolve) { 
            setTimeout(resolve.bind(null, v), t)
        });
     }

    const aiPlay = (theTiles) =>{   
        const {mn: moveNumber, cp: currentPlayer}  = gameState   
        let [p1, p2, p3, p4, p5, p6, p7] = makeRackPerms(theTiles, playersAndPoints[currentPlayer].rack)
        let makeVerslots = tilesOnBoard(theTiles).length !== 0 //no need to make vertical slots if the board is empty
        let [s1, s2, s3, s4, s5, s6, s7] = makeAllSlots(theTiles, makeVerslots)
        let moves = [
            ...moveNumber !== 0 ? evaluateMoves(p1, s1, theTiles, playersAndPoints[currentPlayer].rack) : [], 
            ...evaluateMoves(p2, s2, theTiles, playersAndPoints[currentPlayer].rack), 
            ...evaluateMoves(p3, s3, theTiles, playersAndPoints[currentPlayer].rack),
            ...evaluateMoves(p4, s4, theTiles, playersAndPoints[currentPlayer].rack),
            ...evaluateMoves(p5, s5, theTiles, playersAndPoints[currentPlayer].rack),
            ...evaluateMoves(p6, s6, theTiles, playersAndPoints[currentPlayer].rack),
            ...evaluateMoves(p7, s7, theTiles, playersAndPoints[currentPlayer].rack),
        ]
        moves.sort((x,y)=>y.points-x.points)
        if (moves.length === 0) { 
            console.log("No moves found")
            advanceGameState()
            return
        }
        else {
        moveNPlay(moves, theTiles).then( (newTiles)=>delay(1000, newTiles)).then((newTiles)=>{
                return new Promise((resolve, reject)=>{
                    let tpns = tilesPlayedNotSubmitted(newTiles)
                    let newWords = getAllNewWords(newTiles)
                    let aiScore = score(newTiles, playersAndPoints[currentPlayer].rack)
                    let playersAndPointsCopy = Array.from(playersAndPoints)
                    playersAndPointsCopy[currentPlayer].points+=aiScore
                    setPlayersAndPoints(playersAndPointsCopy)
                    setLastPlayed([{ player: playersAndPoints[currentPlayer].name, word: readWord(longestNewWord(newWords), newTiles), points: aiScore },...lastPlayed])
                    //Change the subitted field to true

                    let tilesNowSubmitted = []
                    for (let tile of tpns){
                        tile.submitted = true
                        tilesNowSubmitted.push(tile)
                    }
                    resolve([...subtractArrays(newTiles,tpns), ...tilesNowSubmitted])
                    })
                }
            ).then((newTiles)=>{
                aiReplenishRack(newTiles)
            })
        }
    }

    



    //////END AI PLAY GROUP/////////////////////////////////////////

    const shuffleRack = () => {
        // Swal.fire("Shuffling rack")
        const {cp: currentPlayer}  = gameState
        console.log("Shuffling Rack")
        updateTiles(shuffleRackTiles(tiles, playersAndPoints[currentPlayer].rack))

    }
    const recall = () => {
        const {cp: currentPlayer}  = gameState
        updateTiles(recallTiles(tiles, playersAndPoints[currentPlayer].rack))
    }



    const passTurn = () => {
        aiPlay(tiles)
    }

    const lookup = () => {
        setShowDict(true)
    }

    const hideModal = () =>{
        setShowDict(false)
    }

    const hideModalVictory = () => {
        setShowVictoryBox(x=>false)
    }


    const play = () => {
        const {cp: currentPlayer}  = gameState
        let tpns = tilesPlayedNotSubmitted(tiles)
        if (tpns.length===0){return}
        
        if (!checkLegalPlacement(tiles, dictChecking, true)){
            return
        }
        let newWords = getAllNewWords(tiles)
        
        
        setPlayersAndPoints(x=>{
            let playersAndPointsCopy = Array.from(x)
            playersAndPointsCopy[currentPlayer].points+=pointsPossible
            return playersAndPointsCopy
        })
        setLastPlayed([{ player: playersAndPoints[currentPlayer].name, word: readWord(longestNewWord(newWords), tiles), points: pointsPossible },...lastPlayed])
        //Change the subitted field to true

        let tilesNowSubmitted = []
        for (let tile of tpns){
            tile.submitted = true
            tilesNowSubmitted.push(tile)
        }
        updateTiles([...subtractArrays(tiles,tpns), ...tilesNowSubmitted])
        let tr = tilesOnRack(tiles, playersAndPoints[currentPlayer].rack)
        if (tr.length ===0) {//bingo
            Swal.fire({
                icon: 'success',
                title: 'All Tiles Used!!!',
                text: 'Great Job!!',
              })
          }

        advanceGameState()
        
        
    }

    const aiReplenishRack = (tiles) => {
        // return new Promise ((resolve, reject) => {
            const {cp: currentPlayer}  = gameState
            let freeSlots = emptyOnRack(tiles, playersAndPoints[currentPlayer].rack)
            if (freeSlots.length===0) {return}
            let removeFromBag =[]
            let addToTiles = []
            let howManyToPick = Math.min(freeSlots.length, bag.length)
            let inds = getUniqueInts0(howManyToPick, bag.length)
            for (let i=0;i<howManyToPick;i++) {
                removeFromBag.push(bag[inds[i]])
                addToTiles.push({pos: freeSlots[i], letter: bag[inds[i]][1], points: parseInt(bag[inds[i]][2]), submitted: playersAndPoints[currentPlayer].level>0 })
            }
            setBag(x=>subtractArrays(bag, removeFromBag))
            updateTiles([...tiles, ...addToTiles])
            advanceGameState()
            // resolve([...tiles, ...addToTiles])
        // })

    }

    const aiReplenishRack1= () => {
        const {cp: currentPlayer}  = gameState
        return new Promise ((resolve, reject) => {
            let freeSlots = emptyOnRack(tiles, playersAndPoints[currentPlayer].rack)
            if (freeSlots.length===0) {
                resolve(tiles)
                return
            }
            let removeFromBag =[]
            let addToTiles = []
            let howManyToPick = Math.min(freeSlots.length, bag.length)
            let inds = getUniqueInts0(howManyToPick, bag.length)
            for (let i=0;i<howManyToPick;i++) {
                removeFromBag.push(bag[inds[i]])
                addToTiles.push({pos: freeSlots[i], letter: bag[inds[i]][1], points: parseInt(bag[inds[i]][2]), submitted: playersAndPoints[currentPlayer].level>0 })
            }
            setBag(x=>subtractArrays(bag, removeFromBag))
            updateTiles([...tiles, ...addToTiles])
            resolve([...tiles, ...addToTiles])
        })

    }

    const replenishRack = () => {
        const {cp: currentPlayer}  = gameState
        let freeSlots = emptyOnRack(tiles, playersAndPoints[currentPlayer].rack)
        if (freeSlots.length===0) {return}
        let removeFromBag =[]
        let addToTiles = []
        let howManyToPick = Math.min(freeSlots.length, bag.length)
        let inds = getUniqueInts0(howManyToPick, bag.length)
        for (let i=0;i<howManyToPick;i++) {
            removeFromBag.push(bag[inds[i]])
            addToTiles.push({pos: freeSlots[i], letter: bag[inds[i]][1], points: parseInt(bag[inds[i]][2]), submitted: playersAndPoints[currentPlayer].level>0 })
        }
        setBag(x=>subtractArrays(bag, removeFromBag))
        updateTiles([...tiles, ...addToTiles])
    }

    const theWinner = () => {
        let playerArray = Array.from(playersAndPoints)
        playerArray.sort((x,y)=> y.points-x.points)
        return playerArray[0].name
    }


    const updateTiles = (newTiles) => {
        setTiles((x) => newTiles)
    }
    return (
        <>
        <VictoryModal show={showVictoryBox} winner={theWinner()} onClickClose={hideModalVictory}/>
        <PassDeviceMessageModal 
        show={showPassDevice} 
        onHide = {hideModalPassDevice} 
        name ={playersAndPoints[gameState.cp].name}
        greeting ={greeting}/>
        <CheckDictionaryModal show={showDict} onHide={hideModal} />
        <ExchangeTilesModal 
            show={showEx} 
            onHide={hideModalEx} 
            whichRack={playersAndPoints[gameState.cp].rack} 
            tiles={tiles} 
            clickHandlerExt={clickHandlerExt}
            handleSubmit={handleExchSubmit}
        />
            <Container>
                <Row>
                    <Col sm={12} lg={7} md={12}>
                        <BoardAndRack
                            tiles={tiles}
                            visibleRack={playersAndPoints[gameState.cp].rack}
                            updateTiles={updateTiles}
                            showTiles={!showPassDevice}
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
                            currentPlayer={gameState.cp}
                            tilesLeft={bag.length}
                            maxPoints={maxPoints}
                            lastPlayed={lastPlayed}
                            exitGame={exitGame}
                            dictChecking ={dictChecking}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Game
