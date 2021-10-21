let specs = [
    [9, "A", 1],
    [12, "E", 1],
    [9, "I", 1],
    [8, "O", 1],
    [6, "N", 1],
    [6, "R", 1],
    [6, "T", 1],
    [4, "L", 1],
    [4, "S", 1],
    [4, "U", 1],
    [4, "D", 2],
    [3, "G", 2],
    [2, "B", 3],
    [2, "C", 3],
    [2, "M", 3],
    [2, "P", 3],
    [2, "F", 4],
    [2, "H", 4],
    [2, "V", 4],
    [2, "W", 4],
    [2, "Y", 4],
    [1, "K", 5],
    [1, "J", 8],
    [1, "X", 8],
    [1, "Q", 10],
    [1, "Z", 10],
    [2, "_", 0],
]


let Bag=[]
let count = 0
for (let x of specs) {
    for (let i = 0; i < x[0]; i++) {
        let newTile = [count, x[1], x[2].toString()]
        // console.log(newTile);
        Bag.push(newTile)
        count++
    }
}

export default Bag

