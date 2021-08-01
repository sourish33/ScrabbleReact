import { formcheck } from "./helpers"

const move = (origin, destination, tiles) => {
    if (!(formcheck(origin))){//checking origin
      console.log(`invalid origin ${origin}`)
      return tiles
    }
    if (!(formcheck(destination))){//checking destination
      console.log(`invalid destination ${destination}`)
      return tiles
    }
    if (origin === destination) {//checking that they are not the same
        console.log("Back to the same location")
        return tiles
    }
    //checking if something exists are destination
    if ( tiles.find((el) => {return el.pos === destination})) {
        console.log("occupied spot")
        return tiles
    }

    let whatsHere = tiles.find((el) => {//can't move if there is nothing to move
        return el.pos === origin
    })
    if (!whatsHere)
      {
        console.log(`Nothing at origin ${origin}`)
        return tiles
    }
    
    
    tiles = tiles.filter((el) => {//removing the entry from the origin
            return el.pos !== origin
        })
    tiles =  [//and adding it to the destination
            ...tiles,
            {
                pos: destination,
                letter: whatsHere.letter,
                points: whatsHere.points,
                submitted: whatsHere.submitted,
            },
        ]
    tiles.sort((x,y)=>{return x.pos>y.pos ? 1 :-1})
    return tiles
}

export default move