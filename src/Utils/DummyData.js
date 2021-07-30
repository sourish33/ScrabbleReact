import { getUniqueInts} from './helpers'

let arr=getUniqueInts(10)
export const TILE_LIST_ARR = [
// {pos: 15*7+7, letter: "A", points: 1},
{pos: "b"+arr[0], letter: "A", points: 1, submitted: true},
{pos: "b"+arr[1], letter: "B", points: 2, submitted: true},
{pos: "b"+arr[2], letter: "E", points: 1, submitted: false},
{pos: "b"+arr[3], letter: "S", points: 1, submitted: false},
{pos: "b"+arr[4], letter: "E", points: 1, submitted: false},
{pos: "b"+arr[5], letter: "T", points: 1, submitted: false},
{pos: "b"+arr[6], letter: "X", points: 10, submitted: false},
{pos: "b"+arr[7], letter: "Q", points: 10, submitted: false},
]
// const TILE_LIST_ARR = []

