import { combinations, permute } from "../Utils/helpers"

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
let rackpos = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"]

let combs = combinations(rackpos)

console.log(combs.length)
let lilcombs = combs.slice(0, 116)

// console.log(combs[100])

let perms = []
for (let comb of combs) {
    perms = [...perms, ...permute(comb)]
}

console.log(perms.length)

console.log(perms)

let p2 = perms.filter((el)=>el.length===2)
let p3 = perms.filter((el)=>el.length===3)
let p4 = perms.filter((el)=>el.length===4)
let p5 = perms.filter((el)=>el.length===5)
let p6 = perms.filter((el)=>el.length===6)
let p7 = perms.filter((el)=>el.length===7)
console.log(p2.length)
console.log(p3.length)
console.log(p4.length)
console.log(p5.length)
console.log(p6.length)
console.log(p7.length)
