import { getAllWords, getAllNewWords, tilesPlayedNotSubmitted,  readPoints, tilesOnBoard, readAllWords, readWord, } from "./Game/GameHelperFunctions";
import { anyCommonElements, intersection, formcheck, loc, coordsTolocWordArr} from "./Utils/helpers";

import {TWs, DWs, TLs, DLs, S} from './Board/BoardMarkings.js'






// import { coords, getUniques, loc,  } from "./Utils/helpers";

let tiles1 = [
    {
      "pos": "b112",
      "letter": "V",
      "points": 4,
      "submitted": true
    },
    {
      "pos": "b113",
      "letter": "O",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b114",
      "letter": "N",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b127",
      "letter": "U",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b141",
      "letter": "D",
      "points": 2,
      "submitted": false
    },
    {
      "pos": "b142",
      "letter": "E",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "b143",
      "letter": "B",
      "points": 3,
      "submitted": false
    },
    {
      "pos": "b158",
      "letter": "O",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b159",
      "letter": "T",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b160",
      "letter": "E",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b175",
      "letter": "R",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b83",
      "letter": "G",
      "points": 2,
      "submitted": true
    },
    {
      "pos": "b98",
      "letter": "L",
      "points": 1,
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
      "letter": "E",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p3",
      "letter": "S",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p4",
      "letter": "E",
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
      "letter": "N",
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
      "letter": "T",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "q5",
      "letter": "T",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "q6",
      "letter": "A",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "b84",
      "letter": "O",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "q4",
      "letter": "I",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "q7",
      "letter": "R",
      "points": 1,
      "submitted": false
    }
  ]

  let tiles = [
    {
      "pos": "b112",
      "letter": "D",
      "points": 2,
      "submitted": true
    },
    {
      "pos": "b126",
      "letter": "K",
      "points": 5,
      "submitted": true
    },
    {
      "pos": "b127",
      "letter": "I",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b128",
      "letter": "C",
      "points": 3,
      "submitted": true
    },
    {
      "pos": "b129",
      "letter": "I",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b130",
      "letter": "N",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b131",
      "letter": "E",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b132",
      "letter": "D",
      "points": 2,
      "submitted": true
    },
    {
      "pos": "b142",
      "letter": "L",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b147",
      "letter": "O",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b148",
      "letter": "H",
      "points": 4,
      "submitted": false
    },
    {
      "pos": "b162",
      "letter": "S",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b163",
      "letter": "E",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "b178",
      "letter": "R",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "b193",
      "letter": "O",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p1",
      "letter": "I",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p2",
      "letter": "E",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p3",
      "letter": "Z",
      "points": 10,
      "submitted": false
    },
    {
      "pos": "p4",
      "letter": "U",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p5",
      "letter": "E",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p6",
      "letter": "I",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "p7",
      "letter": "D",
      "points": 2,
      "submitted": false
    },
    {
      "pos": "q1",
      "letter": "T",
      "points": 1,
      "submitted": false
    },
    {
      "pos": "q3",
      "letter": "G",
      "points": 2,
      "submitted": false
    },
    {
      "pos": "q6",
      "letter": "D",
      "points": 2,
      "submitted": false
    }
  ]
// let tpns= tilesPlayedNotSubmitted(tiles)
// let tpnsLoc = tpns.map((el=>el.pos))

// console.log(tpnsLoc)

// let allWords = getAllWords(tiles)
// console.log(allWords)

// // console.log(anyCommonElements([1,2,3,7,8,9,10,11],[1,2,4,5,6,7]))

// let allwordsLoc= coordsTolocWordArr(allWords)
// console.log(allwordsLoc)
// newWords=allwordsLoc.filter((el)=>anyCommonElements(el, tpnsLoc))
// console.log(readAllWords(newWords, tiles))

// console.log(readAllWords(getAllWords(tiles), tiles))
// console.log(readAllWords(allwordsLoc, tiles))


// function anyCommonElements(array1, array2) {
//     return intersection(array1, array2).length > 0 ? true : false;
// }


let allWords = getAllWords(tiles)
coordsTolocWordArr(allWords)

let u = getAllNewWords(tiles)
console.log(u)

console.log(DWs)

let dws = DWs

DWs = DWs.filter((el)=>el!==16)

console.log(dws)


