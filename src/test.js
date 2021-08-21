import { getAllWords, getAllNewWords, tilesPlayedNotSubmitted,  readPoints, tilesOnBoard, readAllWords, readWord, tilesSubmitted, } from "./Game/GameHelperFunctions";
import { anyCommonElements, intersection, formcheck, loc, coordsTolocWordArr, arrayToMap, multiplyArrays, coords, subtractArrays, getUniques} from "./Utils/helpers";

import {TWs, DWs, TLs, DLs, S} from './Board/BoardMarkings.js'






// import { coords, getUniques, loc,  } from "./Utils/helpers";

let tiles = [
  {
    "pos": "b100",
    "letter": "I",
    "points": 1,
    "submitted": true
  },
  {
    "pos": "b112",
    "letter": "P",
    "points": 3,
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
    "letter": "E",
    "points": 1,
    "submitted": true
  },
  {
    "pos": "b115",
    "letter": "D",
    "points": 2,
    "submitted": true
  },
  {
    "pos": "b85",
    "letter": "M",
    "points": 3,
    "submitted": true
  },
  {
    "pos": "p1",
    "letter": "L",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "p2",
    "letter": "N",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "p3",
    "letter": "U",
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
    "pos": "p6",
    "letter": "O",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "p7",
    "letter": "V",
    "points": 4,
    "submitted": false
  },
  {
    "pos": "q1",
    "letter": "J",
    "points": 8,
    "submitted": false
  },
  {
    "pos": "q2",
    "letter": "T",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "q3",
    "letter": "W",
    "points": 4,
    "submitted": false
  },
  {
    "pos": "q4",
    "letter": "_",
    "points": 0,
    "submitted": false
  },
  {
    "pos": "q5",
    "letter": "S",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "q6",
    "letter": "L",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "q7",
    "letter": "N",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "b99",
    "letter": "M",
    "points": 3,
    "submitted": true
  },
  {
    "pos": "p5",
    "letter": "E",
    "points": 1,
    "submitted": false
  }
]
console.log(tilesOnBoard (tiles))

let allWords = getAllWords(tiles)
coordsTolocWordArr(allWords)

let newWords = getAllNewWords(tiles)
console.log(readAllWords(newWords, tiles))

///////TODO
////1) getLegalPositions
//////checkLegalPlacement

console.log(loc(15,15))

function neighbors(pos){
    let n = parseInt(pos.substring(1))
    if (n<0 || n>224) {
      throw new Error (`${pos} invalid input for neighbors`)
    }
    let bors = []
    if (n-1>=0){
      bors.push("b"+(n-1).toString())
    }
    if (n-15>=0){
      bors.push("b"+(n-15).toString())
    }
    if (n+1<=224){
      bors.push("b"+(n+1).toString())
    }
    if (n+15<=224){
      bors.push("b"+(n+15).toString())
    }
    return bors
}

// const tilesSubmitted = (tiles) => {
//   let tilesSubmitted = tiles.filter((el) => {
//       return el.pos[0] === "b" && el.submitted
//   })
//   return tilesSubmitted
// }



function legalPositions(tiles) {
  let ts = tilesSubmitted(tiles).map((el)=>el.pos)
  if (ts.length ===0) {
    return ['b112']
  }
  
  let allNeighbors = []
  for (let pos of ts) {
    allNeighbors = [...allNeighbors, ...neighbors(pos)]
  }
  
  return getUniques(subtractArrays(allNeighbors, ts))
}

console.log(legalPositions(tiles).sort())
console.log(legalPositions(tiles).length)


function showdis(arr) {
  for (let el of arr) {
    let u = document.getElementById(el)
    u.style.border = "thick solid #0000FF"
  }
}

function removedis(arr) {
  for (let el of arr) {
    let u = document.getElementById(el)
    u.style.border = ""
  }
}

// function getMultiplierOne(posn, tilesNotSubmittedPositions) {

//   if (!tilesNotSubmittedPositions.includes(posn)){
//     return 1
//   }
//   let n = parseInt(posn.substring(1))
//   if (TLs.includes(n)){ return 3}
//   if (DLs.includes(n)) { return 2}
//   return 1
// }


// function getPoints(wordArr, tiles){
//   let pointArr = []
//   for (let word of wordArr){
//     pointArr.push(word.map((el)=>readPoints(el,tiles)))
//   }
//   return pointArr
// }


// function getMultipliersWord(word, tilesNotSubmittedPositions){
//   return word.map((el)=>getMultiplierOne(el, tilesNotSubmittedPositions))
// }


// function calculateScore(words, tiles) {
//   let tpnsPositions = tilesPlayedNotSubmitted(tiles).map((el)=>el.pos)
//   let multipliersArray = words.map((el)=>getMultipliersWord(el, tpnsPositions))
//   let pointArray = getPoints(words, tiles)
//   console.log(multipliersArray)
//   console.log(pointArray)
//   let score = 0
//   for (let i=0;i<words.length;i++){
//     score += multiplyArrays(multipliersArray[i], pointArray[i])
//   }
//   return score
// }


// console.log(calculateScore(newWords, tiles))




