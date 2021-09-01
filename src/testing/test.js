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
    combinations,
    permute,
} from "../Utils/helpers"

import { TWs, DWs, TLs, DLs, S } from "../Board/BoardMarkings.js"
import { checkDict } from "../Utils/Dictionary/dictionary"

// import { coords, getUniques, loc,  } from "./Utils/helpers";

let tiles = [
    {
      "pos": "b112",
      "letter": "L",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b113",
      "letter": "E",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b114",
      "letter": "X",
      "points": 8,
      "submitted": true
    },
    {
      "pos": "b128",
      "letter": "N",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b129",
      "letter": "U",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b130",
      "letter": "T",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b145",
      "letter": "I",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b160",
      "letter": "N",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b162",
      "letter": "Z",
      "points": 10,
      "submitted": true
    },
    {
      "pos": "b175",
      "letter": "T",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b176",
      "letter": "E",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b177",
      "letter": "E",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b192",
      "letter": "D",
      "points": 2,
      "submitted": true
    },
    {
      "pos": "b193",
      "letter": "O",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b194",
      "letter": "O",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b98",
      "letter": "Y",
      "points": 4,
      "submitted": true
    },
    {
      "pos": "p1",
      "letter": "T",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p2",
      "letter": "U",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p3",
      "letter": "O",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p4",
      "letter": "O",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p5",
      "letter": "I",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p6",
      "letter": "P",
      "points": 3,
      "submitted": false
    },
    {
      "pos": "p7",
      "letter": "_",
      "points": 0,
      "submitted": false
    },
    {
      "pos": "q1",
      "letter": "O",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "q2",
      "letter": "E",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "q3",
      "letter": "E",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "q4",
      "letter": "J",
      "points": 8,
      "submitted": false
    },
    {
      "pos": "q5",
      "letter": "Q",
      "points": 10,
      "submitted": false
    },
    {
      "pos": "b209",
      "letter": "A",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b224",
      "letter": "T",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "q6",
      "letter": "E",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "q7",
      "letter": "E",
      "points": 1,
      "submitted": false
    }
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





function makeRackPerms(tiles, visibleRack) {
    let nums = Array.from({ length: 7 }, (x, i) => i + 1)
    let rackPos = nums.map((el)=>visibleRack+el)
    let combs = combinations(rackPos)
    let perms = []
    for (let comb of combs) {
        perms = [...perms, ...permute(comb)]
    }
    let permsMap = new Map()
    for (let perm of perms){
        let word = readWord(perm, tiles)
        if (!permsMap.has(word) && countBlanks(word)<1 ) {
            permsMap.set(readWord(perm, tiles), perm)
        }
    }
    perms =  Array.from(permsMap.values())
    let p2 = perms.filter((el)=>el.length===2)
    let p3 = perms.filter((el)=>el.length===3)
    let p4 = perms.filter((el)=>el.length===4)
    let p5 = perms.filter((el)=>el.length===5)
    let p6 = perms.filter((el)=>el.length===6)
    let p7 = perms.filter((el)=>el.length===7)
    return [p2, p3, p4, p5, p6, p7]
}

let [p2, p3, p4, p5, p6, p7] = makeRackPerms(tiles, 'q')

console.log(p2.length)
console.log(p3.length)
console.log(p4.length)
console.log(p5.length)
console.log(p6.length)
console.log(p7.length)

let rackTiles = p5[47]
let boardPositions = s5[2]
console.log(boardPositions)
console.log(evaluateMove(rackTiles, boardPositions, tiles, 'q'))


function countBlanks(str){
    let blanks =0
    for (let l of str){
        if (l=== "_"){
            blanks+=1
        }
    }
    return blanks
}

let pointillist =[]

// for (let racktiles of s2) {
//     for (let boardpos of p2) {
//         console.log(racktiles)
//         console.log(boardpos)
//         let points = evaluateMove(racktiles, boardpos, tiles, "p")
//         if (points!== null) {
//             pointillist.push({rt: racktiles, bp: boardpos, pts: points })
//         }
//     }
// }

// evaluateMove(s2[0], p2[0], tiles, "p")

console.log(pointillist)