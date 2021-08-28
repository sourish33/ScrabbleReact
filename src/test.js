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
    "pos": "b112",
    "letter": "B",
    "points": 3,
    "submitted": true
  },
  {
    "pos": "b113",
    "letter": "A",
    "points": 1,
    "submitted": true
  },
  {
    "pos": "b114",
    "letter": "Y",
    "points": 4,
    "submitted": true
  },
  {
    "pos": "b128",
    "letter": "T",
    "points": 1,
    "submitted": true
  },
  {
    "pos": "b129",
    "letter": "E",
    "points": 1,
    "submitted": true
  },
  {
    "pos": "b130",
    "letter": "E",
    "points": 1,
    "submitted": true
  },
  {
    "pos": "b131",
    "letter": "M",
    "points": 3,
    "submitted": true
  },
  {
    "pos": "b98",
    "letter": "V",
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
    "letter": "L",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "p3",
    "letter": "D",
    "points": 2,
    "submitted": false
  },
  {
    "pos": "p4",
    "letter": "V",
    "points": 4,
    "submitted": false
  },
  {
    "pos": "p5",
    "letter": "T",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "p6",
    "letter": "F",
    "points": 4,
    "submitted": false
  },
  {
    "pos": "p7",
    "letter": "E",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "q3",
    "letter": "U",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "q4",
    "letter": "E",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "q5",
    "letter": "R",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "q6",
    "letter": "I",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "b146",
    "letter": "O",
    "points": 1,
    "submitted": true
  },
  {
    "pos": "b161",
    "letter": "O",
    "points": 1,
    "submitted": true
  },
  {
    "pos": "b176",
    "letter": "N",
    "points": 1,
    "submitted": true
  },
  {
    "pos": "q1",
    "letter": "E",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "q2",
    "letter": "X",
    "points": 8,
    "submitted": false
  },
  {
    "pos": "q7",
    "letter": "T",
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
console.log(lp)

///////TODO
//////checkLegalPlacement
console.log(newWords[0])

let playerRacks = ['p', 'q']


function rackPoints(rack, tiles) {
      let rackTiles=tiles.filter((el)=>el.pos[0]===rack)
      let totalPoints=0
      for (let tile of rackTiles){
        totalPoints += tile.points
      }
      return totalPoints
}

console.log(rackPoints('q', tiles))

let word=newWords[0]
// let xs =[]
// let ys =[]
// for (let el of word){
//     console.log(el)
//     let n = parseInt(el.substring(1))
//     console.log(n)
//     let [y,x ] = coords(n)
//     ys.push(y)
//     xs.push(x)
// }
// ys = getUniques(ys)
// xs = getUniques(xs)
// console.log()

function checkLegalPlacement (tiles) {
  let newWords = getAllNewWords(tiles)
  console.log(newWords)
  if (newWords.length===0) {return false}
  for (let word of newWords){
    if (!containsOneLegalPosition(word, tiles)) {return false}
    if (!singleRowOrColAndContiguous(word)) {return false}
  }
  return true
}

console.log(checkLegalPlacement(tiles))

function containsOneLegalPosition(word, tiles){
    let lp = legalPositions(tiles)
    console.log(lp)
    console.log(word)
    return anyCommonElements(word, lp)
}

function singleRowOrColAndContiguous(word) {
    let xs =[]
    let ys =[]
    for (let el of word){
        console.log(el)
        let n = parseInt(el.substring(1))
        console.log(n)
        let [y,x ] = coords(n)
        ys.push(y)
        xs.push(x)
    }
    ys=getUniques(ys)
    xs=getUniques(xs)
    if (xs.length>1 && ys.length>1) {
      console.log("multirow")
      return false
    }
    if (!isContiguous(xs) && !isContiguous(ys)){
      console.log("not contiguous")
      return false
    }
    return true

}

// console.log(containsOneLegalPosition(newWords[3], tiles))
// console.log(singleRowOrColAndContiguous(newWords[3]))

console.log(getUniqueInts0(5, 6))
console.log(getUniqueInts0(5, 6))
console.log(getUniqueInts0(5, 6))






// function showdis(arr) {
//   for (let el of arr) {
//     let u = document.getElementById(el)
//     u.style.border = "thick solid #0000FF"
//   }
// }

// function removedis(arr) {
//   for (let el of arr) {
//     let u = document.getElementById(el)
//     u.style.border = ""
//   }
// }

