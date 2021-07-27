export function randomUpTo(max) {
    // min and max included
    let min = 0
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getUniqueInts(n) {
    let arr = Array.from({length: 225}, (x, i) => i+1)
    return shuffle(arr).slice(0,n)
}

export function shuffle(arr) {
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

export const loc = (down,across) => { return 15*(down-1)+across-1}