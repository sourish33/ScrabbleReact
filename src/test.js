import { getAllWords, getAllNewWords, tilesPlayedNotSubmitted,  readPoints, tilesOnBoard, readAllWords, readWord, tilesSubmitted, legalPositions, contains, tilesOnRack, } from "./Game/GameHelperFunctions";
import { anyCommonElements, intersection, formcheck, loc, 
  coordsTolocWordArr, arrayToMap, multiplyArrays, coords, 
  subtractArrays, getUniques, neighbors, getConsecutivesNums, isContiguous, range, getUniqueInts0
} from "./Utils/helpers";

import {TWs, DWs, TLs, DLs, S} from './Board/BoardMarkings.js'
import { checkDict } from "./Utils/Dictionary/dictionary";






// import { coords, getUniques, loc,  } from "./Utils/helpers";

let tiles =[
  {
    "pos": "b111",
    "letter": "R",
    "points": 1,
    "submitted": true
  },
  {
    "pos": "b112",
    "letter": "A",
    "points": 1,
    "submitted": true
  },
  {
    "pos": "b113",
    "letter": "N",
    "points": 1,
    "submitted": true
  },
  {
    "pos": "b127",
    "letter": "G",
    "points": 2,
    "submitted": true
  },
  {
    "pos": "b97",
    "letter": "Z",
    "points": 10,
    "submitted": true
  },
  {
    "pos": "p1",
    "letter": "J",
    "points": 8,
    "submitted": false
  },
  {
    "pos": "p2",
    "letter": "K",
    "points": 5,
    "submitted": false
  },
  {
    "pos": "p3",
    "letter": "N",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "p5",
    "letter": "U",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "q1",
    "letter": "I",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "q2",
    "letter": "S",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "q3",
    "letter": "L",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "q4",
    "letter": "H",
    "points": 4,
    "submitted": false
  },
  {
    "pos": "q5",
    "letter": "E",
    "points": 1,
    "submitted": false
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
  },
  {
    "pos": "b114",
    "letter": "T",
    "points": 0,
    "submitted": true
  },
  {
    "pos": "b84",
    "letter": "M",
    "points": 3,
    "submitted": true
  },
  {
    "pos": "b99",
    "letter": "A",
    "points": 1,
    "submitted": true
  },
  {
    "pos": "p4",
    "letter": "D",
    "points": 2,
    "submitted": false
  },
  {
    "pos": "p6",
    "letter": "C",
    "points": 3,
    "submitted": false
  },
  {
    "pos": "p7",
    "letter": "U",
    "points": 1,
    "submitted": false
  }
]
console.log(tilesOnBoard (tiles))

let allWords = getAllWords(tiles)
console.log(readAllWords(allWords, tiles))
coordsTolocWordArr(allWords)

let newWords = getAllNewWords(tiles)
console.log(readAllWords(newWords, tiles))

let lp = legalPositions(tiles)
let sub = tilesSubmitted(tiles).map((el)=>el.pos)
console.log(sub)

///////TODO
//////checkLegalPlacement
console.log(newWords[0])

function b_loc(posn){
  //takes [2,3] and returns b17
  return 'b'+loc(...posn)
}

function b_coords(posn){
  //takes b17 and returns [2,3]
  let n = parseInt(posn.substring(1))
  return coords(n)
}

function arraysIsomorphic (arr1, arr2) {
  //returns true if one array is a rearrangement of the other
  if (arr1.length!==arr2.length){
    return false
  }
  let commons = intersection(arr1, arr2)
  //if one is just a rearrangement of the other, then the intersection of the two must be equal in length to either array
  if (commons.length!==arr1.length){
    return false
  }
  return true
}

function hasTheSlot(s, slots) {
  //returns true if slots (array of arrays) has the array s in some rearrnged form
  return slots.some((el)=>arraysIsomorphic(el,s))
}

function getXsAndYs(letterArray) {
    let xs =[]
    let ys =[]
    for (let el of letterArray){
        let n = parseInt(el.substring(1))
        let [y,x ] = coords(n)
        ys.push(y)
        xs.push(x)
    }
    ys=getUniques(ys)
    xs=getUniques(xs)
    return [xs, ys]
}

let [xs, ys] = getXsAndYs(lp)
console.log(xs)
console.log(ys)

function makeVerSlots(x,n,legalPos, submittedTiles) {
  if (n>15) { throw new Error(`${n} cannot be greater than 15 in makeVerSlots`)}
  let arr = []
  for (let i=1;i<15-n+2;i++){
    let slot =[]
    for (let j=i;j<n+i;j++){
      slot.push(b_loc([j,x]))
    }
    slot =  slot.filter((el)=>!submittedTiles.includes(el))
    if (slot.length === 0 || slot.length === 1 || slot.length>7 ) {continue}
    if (anyCommonElements(slot, legalPos)){
        arr.push(slot)
    }
  }
  return arr
}
// let uu = makeVerSlots(10,8, lp, sub)
// console.log(uu.length)
// console.log(uu[0])
// console.log(uu[5])
// console.log(uu[uu.length-1])


function makeHorSlots(y, n, legalPos, submittedTiles) {
  //y is the y-coord and n is the length of a window, legalPos are the legal positions and submittedTiles are the submitted Tiles
  //returns an array of all possible slots of lengt
  if (n>15) { throw new Error(`${n} cannot be greater than 15 in makeHorSlots`)}
  let arr =[]
  for (let i=1;i<15-n+2;i++){
    let slot =[]
    for (let j=i;j<n+i;j++){
      slot.push(b_loc([y,j]))
    }
    slot =  slot.filter((el)=>!submittedTiles.includes(el))
    if (slot.length === 0 || slot.length === 1 || slot.length>7 ) {continue}
    if (anyCommonElements(slot, legalPos)){
        arr.push(slot)
    }
  }
  return arr
}


function makeAllHorSlots(tiles, lp, sub){
  const arrMap = new Map()
  let [xs, ys] = getXsAndYs(lp)
  if (ys.length ===0) { return []}
  for (let y of ys) {
    for (let n=2;n<15;n++) {
      let slots = makeHorSlots(y, n, lp, sub)
      for (let slot of slots){
            let str = JSON.stringify(slot.sort())
            if (!arrMap.has(str)) {
                arrMap.set(str, slot.sort())
            }
        }
    }
  }
  return [...arrMap.values()]
}

function makeAllVerSlots(tiles, lp, sub){
  const arrMap = new Map()
  let [xs, ys] = getXsAndYs(lp)
  if (ys.length ===0) { return []}
  for (let x of xs) {
    for (let n=2;n<15;n++) {
      let slots = makeVerSlots(x, n, lp, sub)
      for (let slot of slots){
            let str = JSON.stringify(slot.sort())
            if (!arrMap.has(str)) {
                arrMap.set(str, slot.sort())
            }
        }
    }
  }
  return [...arrMap.values()]
}

function makeAllSlots(tiles){
  let lp = legalPositions(tiles)
  let sub = tilesSubmitted(tiles).map((el)=>el.pos)
  let allSlots = [...makeAllHorSlots(tiles,lp,sub), ...makeAllVerSlots(tiles,lp,sub)]
  let s2 = allSlots.filter((el)=>el.length==2)
  let s3 = allSlots.filter((el)=>el.length==3)
  let s4 = allSlots.filter((el)=>el.length==4)
  let s5 = allSlots.filter((el)=>el.length==5)
  let s6 = allSlots.filter((el)=>el.length==6)
  let s7 = allSlots.filter((el)=>el.length==7)
  return [s2,s3,s4,s5,s6,s7]
}

let [s2,s3,s4,s5,s6,s7] = makeAllSlots(tiles)
console.log(s2.length)


console.log(allSlots[29])















function showdis(arr) {
  for (let el of arr) {
    let u = document.getElementById(el)
    u.style.border = "thick solid #0000FF"
  }
}


function removedis() {
  let sqs= document.querySelectorAll('[id^="b"]')
  for (let sq of sqs) {
    let u = document.getElementById(sq.id)
    u.style.border = ""
  }
}

