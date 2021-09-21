import { evaluateMoves } from "../Game/AIHelperFunctions"



export const crunch = (pp, ss, tiles, whichRack, cutoff) => {

    let result = evaluateMoves(pp, ss, tiles, whichRack, cutoff )
    postMessage(`- ${result.length} ${pp[0].length}-letter words found cutoff: ${cutoff}`)
    postMessage(result)
}