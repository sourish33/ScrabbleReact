import { arrayToMap } from "../Utils/helpers"


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
        letter: "_",
        points: 0,
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

function mapToArray(myMap) {
    let myArr = []
    for (const [key, value] of myMap ) {
      let row = {letter: value[0], points: value[1], pos: key, submitted: value[2] }
      myArr.push(row)
    }
    return myArr
  }


// let starts = ['q1', 'q2']
// let ends = ['b100', 'b101']
// let letter = 'H'

// function aiMove(starts, ends, letter, tiles) {
    
//     let tilesMap = arrayToMap(tiles)
//     console.log(tilesMap)
//     for (let i=0; i<starts.length;i++) {
//         let val = tilesMap.get(starts[i])
//         if (val[0] === "_"){
//             val[0] = letter
//         }
//         val[2] = false
//         tilesMap.set(ends[i], val)
//         tilesMap.delete(starts[i])
//     }
//     return  mapToArray(tilesMap)

// }




