import { evaluateMoves } from "../Game/AIHelperFunctions"



export const crunch = (pp, ss, tiles, whichRack, maxPoints) => {

    let result = evaluateMoves(pp, ss, tiles, whichRack )
    postMessage(`${pp[0].length}-letter words done - ${result.length} found`)
    postMessage(result)
}