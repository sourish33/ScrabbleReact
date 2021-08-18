export function randomUpTo(max) {
    // min and max included
    let min = 0
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function isLetter(c) {
    return c.toLowerCase() !== c.toUpperCase()
}

export function getUniqueInts(n, N = 225) {
    //returns a random integer from 1 to N
    let arr = Array.from({ length: N }, (x, i) => i + 1)
    return shuffle(arr).slice(0, n)
}

export function shuffle(arr) {
    //takes an array and returns a shuffled version
    let L = arr.length - 1
    let sarr = Array.from(arr) //cannot use = cuz JS passes by reference in this case

    for (let i = L; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = sarr[i]
        sarr[i] = sarr[j]
        sarr[j] = temp
    }
    return sarr
}

export function subtractArrays(arr1, arr2) {
    //returns the elements of the longer array (arr1) that are not present in the shorter array (arr2)
    return arr1.filter((value) => !arr2.includes(value))
}

export function emptySpot(arr, whichRack) {
    for (let i = 1; i < 8; i++) {
        let u = arr.find((el) => {
            return el.pos === whichRack + i
        })
        if (!u) {
            return whichRack + i
        }
    }
    return false
}

export const getConsecutivesNums = (data) => {
    //returns arrays of consecutive numbers from an array of numbers
    data.sort((x, y) => x - y)
    let groups = []
    let start = 0
    let end = 0
    for (let i = 0; i < data.length; i++) {
        if (data[i + 1] === data[end] + 1) {
            end = i + 1
        } else {
            groups.push(data.slice(start, end + 1))
            start = i + 1
            end = i + 1
        }
    }
    return groups.filter((x)=>x.length>1)
}

export function addLeft(n, arr) {
    return arr.map((el)=>[n, el])
}

export function addLeftAll(n, Arr) {
    return Arr.map((el)=>addLeft(n, el))
}


export function addRight(n, arr) {
    return arr.map((el)=>[el, n])
}

export function addRightAll(n, Arr) {
    return Arr.map((el)=>addRight(n, el))
}





export function getUniques(arr) {
    //returns unique elements in an array
    return Array.from(new Set(arr))
}

export const loc = (down, across) => {
    //gives the number of a square on the board when given the down and across coordinates from the top left corner (1,1)
    return 15 * (down - 1) + across - 1
}


export const coords = (n) => {
    //inverse of loc
    let x = Math.floor(n/15)+1
    let y = n%15+1
    return [x,y]
  }

export function formcheck(id) {
    return /[bpqrs]\d+$/.test(id)
}

export function arrayToMap(arr) {
    //takes an array of objects and returns a map

    let amap = new Map()
    if (arr.length === 0) {
        return amap
    }
    for (let el of arr) {
        amap.set(el.pos, [el.letter, el.points, el.submitted])
    }
    return amap
}

export function makePlayertable(players, shouldShuffle) {
    let playerList = shouldShuffle === "0" ? players : shuffle(players)
    const racks = ["p", "q", "r", "s"]
    const playerTable = playerList.map((el, ind) => {
        return { name: el.name, level: el.level, points: 0, rack: racks[ind] }
    })
    return playerTable
}
