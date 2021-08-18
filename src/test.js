function whichPlayer(moveNumber, numPlayers){
    return (moveNumber)%numPlayers
}

console.log(whichPlayer(6,3))





// import { readLetter, readPoints, tilesOnBoard } from "./Game/GameHelperFunctions";
// import { TILE_LIST_ARR } from "./Utils/DummyData";
// import { coords, getUniques, loc,  } from "./Utils/helpers";

let tiles = [
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
      "submitted": true
    },
    {
      "pos": "b142",
      "letter": "E",
      "points": 1,
      "submitted": true
    },
    {
      "pos": "b143",
      "letter": "B",
      "points": 3,
      "submitted": true
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


// const getConsecutivesNums = (data) => {
//     //returns arrays of consecutive numbers from an array of numbers
//     data.sort((x, y) => x - y)
//     let groups = []
//     let start = 0
//     let end = 0
//     for (let i = 0; i < data.length; i++) {
//         if (data[i + 1] === data[end] + 1) {
//             end = i + 1
//         } else {
//             groups.push(data.slice(start, end + 1))
//             start = i + 1
//             end = i + 1
//         }
//     }
//     return groups.filter((x)=>x.length>1)
// }

// function addLeft(n, arr) {
//     return arr.map((el)=>[n, el])
// }

// function addLeftAll(n, Arr) {
//     return Arr.map((el)=>addLeft(n, el))
// }


// function addRight(n, arr) {
//     return arr.map((el)=>[el, n])
// }

// function addRightAll(n, Arr) {
//     return Arr.map((el)=>addRight(n, el))
// }


// function readWord(letterArr){
//     let word = []
//     for (let letter of letterArr) {
//         word.push(readLetter(letter,tiles))
//     }
//     return word.join('')
// }

// function readAllWords(wordArr){
//     return wordArr.map((el)=>readWord(el))
// }

// function getAllWords(tiles) {
//     let tb = tilesOnBoard(tiles)
//     let boardnums = tb.map((el)=>parseInt(el.pos.substring(1)))
//     let xys = boardnums.map((el)=>coords(el))
//     let ys = getUniques(xys.map((el)=>el[0]))
//     let xs = getUniques(xys.map((el)=>el[1]))

//     let verwords = []
//     for (let n of xs) {
//         let lettersInThisCol=xys.filter((el)=>el[1]===n)
//         let ysInThisCol = lettersInThisCol.map(el=>el[0])
//         let groups = getConsecutivesNums(ysInThisCol)
//         let words = addRightAll(n, groups)
//         verwords.push(words)
//     }
//     verwords=verwords.flat()
//     console.log(readAllWords(verwords))

//     let horwords = []
//     for (let n of ys) {
//         let lettersInThisRow=xys.filter((el)=>el[0]===n)
//         let xsInThisRow = lettersInThisRow.map(el=>el[1])
//         let groups = getConsecutivesNums(xsInThisRow)
//         let words = addLeftAll(n, groups)
//         horwords.push(words)
//     }
//     horwords = horwords.flat()
//     return [...horwords, ...verwords]

// }

// console.log(readAllWords(getAllWords(tiles)))


