import { shuffle, subtractArrays } from "../Utils/helpers"

export const shuffleRackTiles = (tiles, visibleRack) => {
    //Shuffles the tiles on the rack specified by visibleRack

    //getting all the rack Tiles
    let rackTiles = tiles.filter((el) => {
        return el.pos[0] === visibleRack
    })
    //getting the current positions of the tiles 
    let occupiedSlots = rackTiles.map((el)=>el.pos[1])
    //shuffling the positions
    let shuffledSlots = shuffle(occupiedSlots)
    
    //inserting the shuffled slots
    let shuffledTiles = rackTiles
    let N = rackTiles.length
    for (let i = 0; i < N; i++) {
        shuffledTiles[i].pos = visibleRack + shuffledSlots[i]
    }
    //removing the original rack slots, inserting the new ones and returning
    return [...subtractArrays(tiles, rackTiles), ...shuffledTiles]
}
