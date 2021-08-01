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
{pos: "p1", letter: "L", points: 1, submitted: false},
{pos: "p2", letter: "P", points: 2, submitted: false},
{pos: "p3", letter: "J", points: 8, submitted: false},
{pos: "p4", letter: "M", points: 3, submitted: false},
{pos: "p5", letter: "E", points: 1, submitted: false},
{pos: "p6", letter: "E", points: 1, submitted: false},
{pos: "p7", letter: "U", points: 1, submitted: false},
{pos: "q1", letter: "B", points: 2, submitted: false},
{pos: "q2", letter: "S", points: 1, submitted: false},
{pos: "q6", letter: "_", points: 0, submitted: false},
{pos: "q7", letter: "Z", points: 10, submitted: false},
]
// const TILE_LIST_ARR = []

