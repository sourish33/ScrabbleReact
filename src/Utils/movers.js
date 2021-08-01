import { formcheck } from "./helpers"

const move = (origin, destination, tiles) => {
    if (!formcheck(origin)) {
        //checking origin
        console.log(`invalid origin ${origin}`)
        return tiles
    }
    if (!formcheck(destination)) {
        //checking destination
        console.log(`invalid destination ${destination}`)
        return tiles
    }
    if (origin === destination) {
        //checking that they are not the same
        console.log("Back to the same location")
        return tiles
    }
    //checking if something exists are destination
    if (
        tiles.find((el) => {
            return el.pos === destination
        })
    ) {
        if (origin[0] === destination[0] && origin[0] !== "b") {
            // checking for a rack reshuffle
            return moveOnRack(origin, destination, tiles)
        } else {
            console.log("occupied spot")
        }
        return tiles
    }

    let whatsHere = tiles.find((el) => {
        //can't move if there is nothing to move
        return el.pos === origin
    })
    if (!whatsHere) {
        console.log(`Nothing at origin ${origin}`)
        return tiles
    }

    tiles = tiles.filter((el) => {
        //removing the entry from the origin
        return el.pos !== origin
    })
    tiles = [
        //and adding it to the destination
        ...tiles,
        {
            pos: destination,
            letter: whatsHere.letter,
            points: whatsHere.points,
            submitted: whatsHere.submitted,
        },
    ]
    tiles.sort((x, y) => {
        return x.pos > y.pos ? 1 : -1
    })
    return tiles
}

function moveOnRack(orig, dest, arr) {
    let orignum = parseInt(orig[1])
    let destnum = parseInt(dest[1])

    let r = orig[0]
    let orig_ind = arr.findIndex((el) => el.pos === orig)
    let dest_ind = arr.findIndex((el) => el.pos === dest)
    if (orig_ind === -1 || dest_ind === -1) {
        console.log("orig or dest not found")
        return
    }
    //remove the tile at the origin
    let orig_entry = arr.filter((el) => el.pos === orig)[0]
    arr = arr.filter((el) => el.pos !== orig)
    //shift other tiles left or right
    if (orignum < destnum) {
        for (let el of arr) {
            if (
                el.pos[0] === r &&
                parseInt(el.pos[1]) > orignum &&
                parseInt(el.pos[1]) < destnum + 1
            ) {
                el.pos = r + (parseInt(el.pos[1]) - 1).toString()
            }
        }
    } else {
        for (let el of arr) {
            if (
                el.pos[0] === r &&
                parseInt(el.pos[1]) > destnum - 1 &&
                parseInt(el.pos[1]) < orignum
            ) {
                el.pos = r + (parseInt(el.pos[1]) + 1).toString()
            }
        }
    }
    //reinsert the removed tile at the desired location
    orig_entry.pos = dest
    arr.push(orig_entry)
    arr.sort((x, y) => {
        return x.pos > y.pos ? 1 : -1
    })
    return arr
}

export default move
