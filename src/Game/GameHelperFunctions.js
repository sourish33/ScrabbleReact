import { addLeftAll, addRightAll, coords, getConsecutivesNums, getUniques, loc, shuffle, subtractArrays } from "../Utils/helpers"


export const contains = (position, tiles) => {
    let u = tiles.filter((el)=>el.pos===position)[0]
    return u ? true : false
  }
  

export const readLetter = (position, tiles) => {
    if (!(typeof(position) === "string" || Array.isArray(position))) { throw new Error(`${position} not string or array`)}
    if (Array.isArray(position)) {
        if (position.length===0){ throw new Error(`${position} empty array given to readLetter`) }
        position = 'b'+loc(position[0], position[1])
    }
    if (!contains(position, tiles)){
      throw new Error(`${position} not included in tiles`)
    }
    let slot = tiles.filter((el)=>el.pos===position)[0]
    return slot.letter
  }

export function readWord(letterArr, tiles){
    let word = []
    for (let letter of letterArr) {
        word.push(readLetter(letter,tiles))
    }
    return word.join('')
}

export function readAllWords(wordArr, tiles){
    return wordArr.map((el)=>readWord(el, tiles))
}
  
export const readPoints = (position, tiles)=> {
    if (!(typeof(position) === "string" || Array.isArray(position))) { throw new Error(`${position} not string or array`)}
    if (Array.isArray(position)) {
        if (position.length===0){ throw new Error(`${position} empty array given to readPoints`) }
        position = 'b'+loc(position[0], position[1])
    }
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

export function getAllWords(tiles) {
    let tb = tilesOnBoard(tiles)
    let boardnums = tb.map((el)=>parseInt(el.pos.substring(1)))
    let xys = boardnums.map((el)=>coords(el))
    let ys = getUniques(xys.map((el)=>el[0]))
    let xs = getUniques(xys.map((el)=>el[1]))

    let verwords = []
    for (let n of xs) {
        let lettersInThisCol=xys.filter((el)=>el[1]===n)
        let ysInThisCol = lettersInThisCol.map(el=>el[0])
        let groups = getConsecutivesNums(ysInThisCol)
        let words = addRightAll(n, groups)
        verwords.push(words)
    }
    verwords=verwords.flat()

    let horwords = []
    for (let n of ys) {
        let lettersInThisRow=xys.filter((el)=>el[0]===n)
        let xsInThisRow = lettersInThisRow.map(el=>el[1])
        let groups = getConsecutivesNums(xsInThisRow)
        let words = addLeftAll(n, groups)
        horwords.push(words)
    }
    horwords = horwords.flat()
    return [...horwords, ...verwords]
}
