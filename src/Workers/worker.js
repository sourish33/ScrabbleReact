import { evaluateMoves } from "../Game/AIHelperFunctions"



export const crunch = (pp, ss, tiles, whichRack, cutoff, toWin) => {
    let result = evaluateMoves(pp, ss, tiles, whichRack, cutoff, toWin )
    postMessage(`Done with ${pp[0].length}-letter words, ${result.length} found `)
    postMessage(result)
}