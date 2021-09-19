import { evaluateMoves } from "../Game/AIHelperFunctions"



export const crunch = (pp, ss, tiles, whichRack, maxPoints) => {

    postMessage(`working the ${pp[0].length}-letter words`)
    postMessage(evaluateMoves(pp, ss, tiles, whichRack ) )
}