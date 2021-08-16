import { shuffle, subtractArrays } from "../Utils/helpers"


export const contains = (position, tiles) => {
    let u = tiles.filter((el)=>el.pos===position)[0]
    return u ? true : false
  }
  

export const readLetter = (position, tiles) => {
    if (!contains(position, tiles)){
      throw new Error(`${position} not included in tiles`)
    }
    let slot = tiles.filter((el)=>el.pos===position)[0]
    return slot.letter
  }
  
export const  readPoints = (position, tiles)=> {
    if (!contains(position, tiles)){
      throw new Error(`${position} not included in tiles`)
    }
    let slot = tiles.filter((el)=>el.pos===position)[0]
    return slot.points
  }

export const changeLetter = (position, newLetter, tiles) => {
    let slot = tiles.filter((el)=>el.pos===position)[0]
    slot.letter = newLetter
    let slotRemoved = tiles.filter((el)=>el.pos!==position)
    return [...slotRemoved, slot]
}

export const tilesOnRack = (tiles, rack) => {
    let rackTiles = tiles.filter((el) => {
        return el.pos[0] === rack
    })
    return rackTiles
}

export const tilesOnBoard = (tiles) => {
    let boardTiles = tiles.filter((el) => {
        return el.pos[0] === "b"
    })
    return boardTiles
}

export const tilesPlayedNotSubmitted = (tiles) => {
    let tilesPlayedNotSubmitted = tiles.filter((el)=>{
        return el.pos[0]==="b" && !el.submitted
    })
    return tilesPlayedNotSubmitted
}

export const emptyOnRack = (tiles, rack) =>{
    let rackTiles = tilesOnRack(tiles, rack)
  let occupiedSlots = rackTiles.map((el)=>el.pos[1])
  let freeSlots=subtractArrays(["1","2","3","4","5","6","7"], occupiedSlots)
  return freeSlots.map((el)=>rack+el)
}

export const shuffleRackTiles = (tiles, rack) => {
    //Shuffles the tiles on the rack specified by rack

    //getting all the rack Tiles
    let rackTiles = tilesOnRack(tiles, rack)

    //getting the current positions of the tiles 
    let occupiedSlots = rackTiles.map((el)=>el.pos[1])
    //shuffling the positions
    let shuffledSlots = shuffle(occupiedSlots)
    
    //inserting the shuffled slots
    let shuffledTiles = rackTiles
    let N = rackTiles.length
    for (let i = 0; i < N; i++) {
        shuffledTiles[i].pos = rack + shuffledSlots[i]
    }
    //removing the original rack slots, inserting the new ones and returning
    return [...subtractArrays(tiles, rackTiles), ...shuffledTiles]
}


export const recallTiles = (tiles, rack) => {

    let unsubmittedTiles = tilesPlayedNotSubmitted(tiles)

    if (unsubmittedTiles.length ===0){
        console.log("nothing to return")
        return tiles
    }
    //check for and handle blank tiles
    for (let tile of unsubmittedTiles) {
        if (tile.points === 0) {
            tile.letter = "_"
        }
    }

    let rackTiles = tilesOnRack(tiles, rack)

    if (rackTiles.length===7){
        throw new Error("all slots occupied on rack - cannot recall")
        
    }

    let freeSlots = emptyOnRack(tiles, rack)
    if (freeSlots.length!==unsubmittedTiles.length){
        throw new Error("number of tiles on board doesnt match number of empty spots  on rack")
    }
    //making a copy of boardtiles to for changing positions to the free positions on the rack
    let returnedTiles = unsubmittedTiles
    for (let n=0;n<unsubmittedTiles.length;n++){
        returnedTiles[n].pos=freeSlots[n]
    }

    return [...subtractArrays(tiles, unsubmittedTiles), ...returnedTiles]

}