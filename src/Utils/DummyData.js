import { getUniqueInts} from './helpers'

let arr=getUniqueInts(6)
export const TILE_LIST_ARR = [
// {pos: 15*7+7, letter: "A", points: 1},
{pos: arr[5], letter: "A", points: 1, submitted: true},
{pos: arr[0], letter: "B", points: 2, submitted: false},
{pos: arr[1], letter: "P", points: 1, submitted: false},
{pos: arr[2], letter: "S", points: 1, submitted: false},
{pos: arr[3], letter: "E", points: 1, submitted: false},
{pos: arr[4], letter: "T", points: 1, submitted: false},
]
// const TILE_LIST_ARR = []

