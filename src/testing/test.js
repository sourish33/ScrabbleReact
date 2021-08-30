import {
    getAllWords,
    getAllNewWords,
    tilesPlayedNotSubmitted,
    readPoints,
    tilesOnBoard,
    readAllWords,
    readWord,
    tilesSubmitted,
    legalPositions,
    contains,
    tilesOnRack,
    score,
    checkLegalPlacement,
} from "../Game/GameHelperFunctions"
import {
    anyCommonElements,
    intersection,
    formcheck,
    loc,
    coordsTolocWordArr,
    arrayToMap,
    multiplyArrays,
    coords,
    subtractArrays,
    getUniques,
    neighbors,
    getConsecutivesNums,
    isContiguous,
    range,
    getUniqueInts0,
    b_coords,
} from "../Utils/helpers"

import { TWs, DWs, TLs, DLs, S } from "../Board/BoardMarkings.js"
import { checkDict } from "../Utils/Dictionary/dictionary"

// import { coords, getUniques, loc,  } from "./Utils/helpers";

let tiles = [
    {
        pos: "b111",
        letter: "N",
        points: 1,
        submitted: true,
    },
    {
        pos: "b112",
        letter: "A",
        points: 1,
        submitted: true,
    },
    {
        pos: "b113",
        letter: "M",
        points: 3,
        submitted: true,
    },
    {
        pos: "b114",
        letter: "E",
        points: 1,
        submitted: true,
    },
    {
        pos: "b125",
        letter: "R",
        points: 1,
        submitted: true,
    },
    {
        pos: "b126",
        letter: "A",
        points: 1,
        submitted: true,
    },
    {
        pos: "b127",
        letter: "M",
        points: 3,
        submitted: true,
    },
    {
        pos: "b140",
        letter: "A",
        points: 1,
        submitted: true,
    },
    {
        pos: "b155",
        letter: "V",
        points: 4,
        submitted: true,
    },
    {
        pos: "b168",
        letter: "L",
        points: 1,
        submitted: true,
    },
    {
        pos: "b169",
        letter: "E",
        points: 1,
        submitted: true,
    },
    {
        pos: "b170",
        letter: "E",
        points: 1,
        submitted: true,
    },
    {
        pos: "b183",
        letter: "O",
        points: 1,
        submitted: true,
    },
    {
        pos: "b198",
        letter: "O",
        points: 1,
        submitted: true,
    },
    {
        pos: "b69",
        letter: "H",
        points: 4,
        submitted: true,
    },
    {
        pos: "b70",
        letter: "A",
        points: 1,
        submitted: true,
    },
    {
        pos: "b71",
        letter: "W",
        points: 4,
        submitted: true,
    },
    {
        pos: "b84",
        letter: "O",
        points: 1,
        submitted: true,
    },
    {
        pos: "b97",
        letter: "J",
        points: 8,
        submitted: true,
    },
    {
        pos: "b99",
        letter: "K",
        points: 5,
        submitted: true,
    },
    {
        pos: "p1",
        letter: "S",
        points: 1,
        submitted: false,
    },
    {
        pos: "p2",
        letter: "D",
        points: 2,
        submitted: false,
    },
    {
        pos: "p3",
        letter: "S",
        points: 1,
        submitted: false,
    },
    {
        pos: "p7",
        letter: "U",
        points: 1,
        submitted: false,
    },
    {
        pos: "q1",
        letter: "E",
        points: 1,
        submitted: false,
    },
    {
        pos: "q2",
        letter: "P",
        points: 3,
        submitted: false,
    },
    {
        pos: "q3",
        letter: "V",
        points: 4,
        submitted: false,
    },
    {
        pos: "q4",
        letter: "I",
        points: 1,
        submitted: false,
    },
    {
        pos: "q5",
        letter: "_",
        points: 0,
        submitted: false,
    },
    {
        pos: "q6",
        letter: "G",
        points: 2,
        submitted: false,
    },
    {
        pos: "q7",
        letter: "U",
        points: 1,
        submitted: false,
    },
    {
        pos: "b41",
        letter: "L",
        points: 1,
        submitted: true,
    },
    {
        pos: "b56",
        letter: "E",
        points: 1,
        submitted: true,
    },
    {
        pos: "b86",
        letter: "D",
        points: 2,
        submitted: true,
    },
    {
        pos: "p4",
        letter: "P",
        points: 3,
        submitted: false,
    },
    {
        pos: "p5",
        letter: "N",
        points: 1,
        submitted: false,
    },
    {
        pos: "p6",
        letter: "O",
        points: 1,
        submitted: false,
    },
]
console.log(tilesOnBoard(tiles))

let allWords = getAllWords(tiles)
console.log(readAllWords(allWords, tiles))
coordsTolocWordArr(allWords)

let newWords = getAllNewWords(tiles)
console.log(readAllWords(newWords, tiles))

let lp = legalPositions(tiles)
let sub = tilesSubmitted(tiles).map((el) => el.pos)
console.log(sub)

console.log(newWords[0])

function b_loc(posn) {
    //takes [2,3] and returns b17
    return "b" + loc(...posn)
}

// function arraysIsomorphic (arr1, arr2) {
//   //returns true if one array is a rearrangement of the other
//   if (arr1.length!==arr2.length){
//     return false
//   }
//   let commons = intersection(arr1, arr2)
//   //if one is just a rearrangement of the other, then the intersection of the two must be equal in length to either array
//   if (commons.length!==arr1.length){
//     return false
//   }
//   return true
// }

// function hasTheSlot(s, slots) {
//   //returns true if slots (array of arrays) has the array s in some rearrnged form
//   return slots.some((el)=>arraysIsomorphic(el,s))
// }


function mapToArray(myMap) {
  let myArr = []
  for (const [key, value] of myMap ) {
    let row = {letter: value[0], points: value[1], pos: key, submitted: value[2] }
    myArr.push(row)
  }
  return myArr
}

function getXsAndYs(letterArray) {
    let xs = []
    let ys = []
    for (let el of letterArray) {
        let n = parseInt(el.substring(1))
        let [y, x] = coords(n)
        ys.push(y)
        xs.push(x)
    }
    ys = getUniques(ys)
    xs = getUniques(xs)
    return [xs, ys]
}


function makeVerSlots(x, n, legalPos, submittedTiles) {
    if (n > 15) {
        throw new Error(`${n} cannot be greater than 15 in makeVerSlots`)
    }
    let arr = []
    for (let i = 1; i < 15 - n + 2; i++) {
        let slot = []
        for (let j = i; j < n + i; j++) {
            slot.push(b_loc([j, x]))
        }
        slot = slot.filter((el) => !submittedTiles.includes(el))
        if (slot.length === 0 || slot.length === 1 || slot.length > 7) {
            continue
        }
        if (anyCommonElements(slot, legalPos)) {
            arr.push(slot)
        }
    }
    return arr
}

function prioritySort(slotArray) {
    let bTWs = TWs.map((el) => "b" + el)
    let bDWs = DWs.map((el) => "b" + el)
    let bTLs = TLs.map((el) => "b" + el)
    let bDLs = DLs.map((el) => "b" + el)

    let TWslots = slotArray.filter((el) => anyCommonElements(el, bTWs))
    slotArray = subtractArrays(slotArray, TWslots)
    let DWslots = slotArray.filter((el) => anyCommonElements(el, bDWs))
    slotArray = subtractArrays(slotArray, DWslots)
    let TLslots = slotArray.filter((el) => anyCommonElements(el, bTLs))
    slotArray = subtractArrays(slotArray, TLslots)
    let DLslots = slotArray.filter((el) => anyCommonElements(el, bDLs))
    slotArray = subtractArrays(slotArray, DLslots)
    return [...TWslots, ...DWslots, ...TLslots, ...DLslots, ...slotArray]
}

function makeHorSlots(y, n, legalPos, submittedTiles) {
    //y is the y-coord and n is the length of a window, legalPos are the legal positions and submittedTiles are the submitted Tiles
    //returns an array of all possible slots of lengt
    if (n > 15) {
        throw new Error(`${n} cannot be greater than 15 in makeHorSlots`)
    }
    let arr = []
    for (let i = 1; i < 15 - n + 2; i++) {
        let slot = []
        for (let j = i; j < n + i; j++) {
            slot.push(b_loc([y, j]))
        }
        slot = slot.filter((el) => !submittedTiles.includes(el))
        if (slot.length === 0 || slot.length === 1 || slot.length > 7) {
            continue
        }
        if (anyCommonElements(slot, legalPos)) {
            arr.push(slot)
        }
    }
    return arr
}

function makeAllHorSlots(tiles, lp, sub) {
    const arrMap = new Map()
    let [xs, ys] = getXsAndYs(lp)
    if (ys.length === 0) {
        return []
    }
    for (let y of ys) {
        for (let n = 2; n < 15; n++) {
            let slots = makeHorSlots(y, n, lp, sub)
            for (let slot of slots) {
                let str = JSON.stringify(slot.sort())
                if (!arrMap.has(str)) {
                    arrMap.set(str, slot.sort())
                }
            }
        }
    }
    return [...arrMap.values()]
}

function makeAllVerSlots(tiles, lp, sub) {
    const arrMap = new Map()
    let [xs, ys] = getXsAndYs(lp)
    if (ys.length === 0) {
        return []
    }
    for (let x of xs) {
        for (let n = 2; n < 15; n++) {
            let slots = makeVerSlots(x, n, lp, sub)
            for (let slot of slots) {
                let str = JSON.stringify(slot.sort())
                if (!arrMap.has(str)) {
                    arrMap.set(str, slot.sort())
                }
            }
        }
    }
    return [...arrMap.values()]
}

function makeAllSlots(tiles) {
    let lp = legalPositions(tiles)
    let sub = tilesSubmitted(tiles).map((el) => el.pos)
    let allSlots = [
        ...makeAllHorSlots(tiles, lp, sub),
        ...makeAllVerSlots(tiles, lp, sub),
    ]
    let s2 = allSlots.filter((el) => el.length === 2)
    let s3 = allSlots.filter((el) => el.length === 3)
    let s4 = allSlots.filter((el) => el.length === 4)
    let s5 = allSlots.filter((el) => el.length === 5)
    let s6 = allSlots.filter((el) => el.length === 6)
    let s7 = allSlots.filter((el) => el.length === 7)
    let bins = [s2, s3, s4, s5, s6, s7]
    return bins.map((el) => prioritySort(el))
}

let [s2, s3, s4, s5, s6, s7] = makeAllSlots(tiles)
console.log(lp.length)
console.log(s2.length)
console.log(s3.length)
console.log(s4.length)
console.log(s5.length)
console.log(s6.length)
console.log(s7.length)

console.log(s4[1])

function showdis(arr) {
    for (let el of arr) {
        let u = document.getElementById(el)
        u.style.border = "thick solid #0000FF"
    }
}

function removedis() {
    let sqs = document.querySelectorAll('[id^="b"]')
    for (let sq of sqs) {
        let u = document.getElementById(sq.id)
        u.style.border = ""
    }
}

function evaluateMove(rackTiles, boardPositions, tiles, visibleRack) {
    if (rackTiles.length!==boardPositions.length){
      throw new Error (`${rackTiles} and ${boardPositions} unequal length in evaluateMove`)
    }
    let tilesCopy = Array.from(tiles)
    let tilesCopyMap = arrayToMap(tiles)
    for (let i=0;i<tilesCopyMap.size;i++) {
      let st = rackTiles[i]
      let end = boardPositions[i]
      let val = tilesCopyMap.get(st)
      tilesCopyMap.set(end, val)
      tilesCopyMap.delete(st)
    }
    tilesCopy = mapToArray(tilesCopyMap)
    console.log(tilesCopy)
    let nWords = readAllWords(getAllNewWords(tilesCopy), tilesCopy)
    let anyBadWords = nWords.some((el)=>!checkDict(el))
    let badPlacement = !checkLegalPlacement(tilesCopy, false, false)
    if (badPlacement){
        throw new Error (`${rackTiles} and ${boardPositions} giving bad placement`)
    }
    return anyBadWords || badPlacement ? null : score(tilesCopy, visibleRack)
}

console.log(tiles)


let rackTiles = ['q1', 'q2','q3', 'q4', 'q6']
let boardPositions = s5[130]
console.log(boardPositions)

console.log(evaluateMove(rackTiles, boardPositions, tiles, 'q'))

console.log(b_loc([6,14]))

let tilesCopy = Array.from(tiles)
let tilesCopyMap = arrayToMap(tilesCopy)
for (let i=0;i<tilesCopyMap.size;i++) {
  let st = rackTiles[i]
  let end = boardPositions[i]
  let val = tilesCopyMap.get(st)
  tilesCopyMap.set(end, val)
  tilesCopyMap.delete(st)
}
tilesCopy = mapToArray(tilesCopyMap)
let nWords = readAllWords(getAllNewWords(tilesCopy), tilesCopy)
console.log(nWords)
console.log(nWords.some((el)=>!checkDict(el)))
console.log(score(tilesCopy, 'q'))


console.log(tilesCopy)



console.log(mapToArray(tilesCopyMap))