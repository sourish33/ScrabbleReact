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
    // neighbors,
    getConsecutivesNums,
    isContiguous,
    range,
    getUniqueInts0,
    b_coords,
    combinations,
    permute,
} from "../Utils/helpers"

import { TWs, DWs, TLs, DLs, S } from "../Board/BoardMarkings.js"
import { checkDict } from "../Utils/Dictionary/dictionary"

// import { coords, getUniques, loc,  } from "./Utils/helpers";

let tiles =[
    {
      "letter": "J",
      "points": 8,
      "pos": "b109",
      "submitted": true
    },
    {
      "letter": "O",
      "points": 1,
      "pos": "b110",
      "submitted": true
    },
    {
      "letter": "E",
      "points": 1,
      "pos": "b111",
      "submitted": true
    },
    {
      "letter": "Y",
      "points": 4,
      "pos": "b112",
      "submitted": true
    },
    {
      "letter": "N",
      "points": 1,
      "pos": "p7",
      "submitted": false
    },
    {
      "letter": "A",
      "points": 1,
      "pos": "q6",
      "submitted": false
    },
    {
      "letter": "F",
      "points": 4,
      "pos": "b126",
      "submitted": true
    },
    {
      "letter": "E",
      "points": 1,
      "pos": "b127",
      "submitted": true
    },
    {
      "letter": "G",
      "points": 2,
      "pos": "b128",
      "submitted": true
    },
    {
      "letter": "D",
      "points": 2,
      "pos": "b96",
      "submitted": true
    },
    {
      "letter": "E",
      "points": 1,
      "pos": "b97",
      "submitted": true
    },
    {
      "letter": "B",
      "points": 3,
      "pos": "b98",
      "submitted": true
    },
    {
      "letter": "G",
      "points": 2,
      "pos": "b140",
      "submitted": true
    },
    {
      "letter": "I",
      "points": 1,
      "pos": "b141",
      "submitted": true
    },
    {
      "letter": "D",
      "points": 2,
      "pos": "b142",
      "submitted": true
    },
    {
      "letter": "E",
      "points": 1,
      "pos": "q7",
      "submitted": false
    },
    {
      "letter": "L",
      "points": 1,
      "pos": "b114",
      "submitted": true
    },
    {
      "letter": "S",
      "points": 1,
      "pos": "b129",
      "submitted": true
    },
    {
      "letter": "C",
      "points": 3,
      "pos": "b84",
      "submitted": true
    },
    {
      "letter": "E",
      "points": 1,
      "pos": "b99",
      "submitted": true
    },
    {
      "letter": "B",
      "points": 0,
      "pos": "b64",
      "submitted": true
    },
    {
      "letter": "E",
      "points": 1,
      "pos": "b79",
      "submitted": true
    },
    {
      "letter": "N",
      "points": 1,
      "pos": "b94",
      "submitted": true
    },
    {
      "letter": "D",
      "points": 2,
      "pos": "q5",
      "submitted": false
    },
    {
      "letter": "V",
      "points": 4,
      "pos": "b154",
      "submitted": true
    },
    {
      "letter": "I",
      "points": 1,
      "pos": "b155",
      "submitted": true
    },
    {
      "letter": "S",
      "points": 0,
      "pos": "b156",
      "submitted": true
    },
    {
      "letter": "I",
      "points": 1,
      "pos": "p6",
      "submitted": false
    },
    {
      "letter": "V",
      "points": 4,
      "pos": "b76",
      "submitted": true
    },
    {
      "letter": "O",
      "points": 1,
      "pos": "b77",
      "submitted": true
    },
    {
      "letter": "T",
      "points": 1,
      "pos": "b78",
      "submitted": true
    },
    {
      "letter": "D",
      "points": 2,
      "pos": "b80",
      "submitted": true
    },
    {
      "letter": "N",
      "points": 1,
      "pos": "q1",
      "submitted": false
    },
    {
      "letter": "L",
      "points": 1,
      "pos": "q2",
      "submitted": false
    },
    {
      "letter": "E",
      "points": 1,
      "pos": "q3",
      "submitted": false
    },
    {
      "letter": "S",
      "points": 1,
      "pos": "q4",
      "submitted": false
    },
    {
      "letter": "U",
      "points": 1,
      "pos": "b115",
      "submitted": true
    },
    {
      "letter": "N",
      "points": 1,
      "pos": "b116",
      "submitted": true
    },
    {
      "letter": "A",
      "points": 1,
      "pos": "b117",
      "submitted": true
    },
    {
      "letter": "T",
      "points": 1,
      "pos": "b118",
      "submitted": true
    },
    {
      "letter": "E",
      "points": 1,
      "pos": "b119",
      "submitted": true
    },
    {
      "pos": "p1",
      "letter": "I",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p2",
      "letter": "A",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p3",
      "letter": "T",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p4",
      "letter": "R",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p5",
      "letter": "R",
      "points": 1,
      "submitted": false
    }
  ]
console.log(legalPositions(tiles))

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

console.log(s2[1])

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

function neighbors(pos){
    let n = parseInt(pos.substring(1))
    if (n<0 || n>224) {
      throw new Error (`${pos} invalid input for neighbors`)
    }
    let bors = []
    let [y,x] = coords(n)
    if (n-1>=0 && coords(n-1)[0]===y){
      bors.push("b"+(n-1).toString())
    }
    if (n-15>=0 && coords(n-15)[1]===x){
      bors.push("b"+(n-15).toString())
    }
    if (n+1<=224 && coords(n+1)[0]===y){
      bors.push("b"+(n+1).toString())
    }
    if (n+15<=224 && coords(n+15)[1]===x){
      bors.push("b"+(n+15).toString())
    }
    return bors
}

console.log(coords(119))
console.log(coords(120))

console.log(neighbors('b22'))

