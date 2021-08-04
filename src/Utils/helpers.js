export function randomUpTo(max) {
    // min and max included
    let min = 0
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getUniqueInts(n, N=225) {
    //returns a random integer from 1 to N
    let arr = Array.from({length: N}, (x, i) => i+1)
    return shuffle(arr).slice(0,n)
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

export function emptySpot(arr, whichRack){
    for (let i=1;i<8;i++){
      let u=arr.find(el=>{return el.pos===whichRack+i})
      if (!u) {return whichRack+i}
    }
    return false
  }

export const loc = (down,across) => { 
    //gives the number of a square on the board when given the down and across coordinates from the top left corner (1,1)
    return 15*(down-1)+across-1
}

export function formcheck(id) {
    return /[bpqrs]\d+$/.test(id)
}

export function arrayToMap(arr) {
    //takes an array of objects and returns a map

    let amap = new Map()
    if (arr.length===0) { return amap}
    for (let el of arr) {
      amap.set(el.pos, [el.letter, el.points, el.submitted])
    }
    return amap
  }

export function setBoardSize() {
    let n = 95
    let w = window.innerWidth
    let h = window.innerHeight
    let ww = Math.min(w, h)
    if (ww > 650) {
        n = 85
    }
    let width = parseInt((ww * n) / 100)
    let height = parseInt((ww * n) / 100)
    return ([width, height])
}