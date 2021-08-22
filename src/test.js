import { getAllWords, getAllNewWords, tilesPlayedNotSubmitted,  readPoints, tilesOnBoard, readAllWords, readWord, tilesSubmitted, legalPositions, contains, tilesOnRack, } from "./Game/GameHelperFunctions";
import { anyCommonElements, intersection, formcheck, loc, 
  coordsTolocWordArr, arrayToMap, multiplyArrays, coords, 
  subtractArrays, getUniques, neighbors, getConsecutivesNums, isContiguous, range
} from "./Utils/helpers";

import {TWs, DWs, TLs, DLs, S} from './Board/BoardMarkings.js'
import { checkDict } from "./Utils/Dictionary/dictionary";






// import { coords, getUniques, loc,  } from "./Utils/helpers";

let tiles =[
  {
    "pos": "b112",
    "letter": "G",
    "points": 2,
    "submitted": false
  },
  {
    "pos": "b113",
    "letter": "O",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "b114",
    "letter": "E",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "b115",
    "letter": "S",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "p1",
    "letter": "E",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "p2",
    "letter": "I",
    "points": 1,
    "submitted": false
  },
  {
    "pos": "p5",
    "letter": "_",
    "points": 0,
    "submitted": false
  }
]
console.log(tilesOnBoard (tiles))

let allWords = getAllWords(tiles)
coordsTolocWordArr(allWords)

let newWords = getAllNewWords(tiles)
console.log(readAllWords(newWords, tiles))

let lp = legalPositions(tiles)
console.log(lp)

///////TODO
//////checkLegalPlacement
console.log(newWords[0])



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




console.log(lp.sort())
console.log(lp.length)



  console.log(range(7,10))

export function gapWords(tiles){
  let tpns = tilesPlayedNotSubmitted(tiles)
  let boardnums = tpns.map((el) => parseInt(el.pos.substring(1)))
  let xys = boardnums.map((el) => coords(el))
  console.log(xys)
  let ys = getUniques(xys.map((el) => el[0])).sort()
  let xs = getUniques(xys.map((el) => el[1])).sort()
  console.log(xs)

  if (xs.length>1 && ys.length>1) {
      console.log(`xs.length = ${xs.length}, ys.length= ${ys.length}`)
    return false
  }
  if (xs.length===1) {
      let yrange = range(Math.min(...ys), Math.max(...ys)+1)
      console.log(yrange)
      for (let y of yrange){
        let posn = "b"+loc(y, xs[0]).toString()
        if (!contains(posn, tiles)){ 
            console.log(`${posn} or (${y}, ${xs[0]} ) not found`)
            return false
          }
      }

    }
  
  if (ys.length===1) {
    let xrange = range(Math.min(...xs), Math.max(...xs))
    console.log(xrange)
    for (let x of xrange){
      let posn = "b"+loc(ys[0],x).toString()
      if (!contains(posn, tiles)){ 
          console.log(`${posn} or (${ys[0]}, ${x} ) not found`)
          return false}
    }

    }
  
  return true
}


console.log(gapWords(tiles))

let nw = getAllNewWords(tiles)
console.log(nw)
console.log(readAllWords(nw, tiles))

function scoreWord(word, tiles){
  let sum =0
  let doublers = 0
  let triplers = 0
  let tpns = tilesPlayedNotSubmitted(tiles).map((el)=>el.pos)
  // console.log(tpns)
  for (let l of word){
    // console.log(l)
    let num = parseInt(l.substring(1))
    // console.log(num)
    let points = readPoints(l, tiles)
    if (tpns.includes(l) ) {
      if (DLs.includes(num)) {
        sum += 2*points
      }
      else if (TLs.includes(num) ) {
        sum += 3*points
      }
      else if (DWs.includes(num) ) {
        sum += points
        doublers += 1
      }
      else if (S===num ){
        sum += points
        doublers += 1
      }
      else if (TWs.includes(num) ){
        sum += points
        triplers += 1
      }
      else {
        sum += points
      }

    }
    else {
      sum += points
    }
  }
  // console.log(doublers)
  // console.log(sum)
  if (doublers>0) {
    sum = sum*2*doublers
  }
  if (triplers>0) {
    sum = sum*3*triplers
  }
  return sum
}


function score(tiles, visibleRack) {
  let newWords = getAllNewWords(tiles)
  let score = 0
  for (let word of newWords){
    score += scoreWord(word, tiles)
  }
  let tr = tilesOnRack(tiles, visibleRack)
  if (tr.length ===0) {
    score += 50 
    //bingo
  }
  return score
}

console.log(scoreWord(nw[0],tiles))
// console.log(scoreWord(nw[1],tiles))
console.log(score(tiles, 'p'))











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




