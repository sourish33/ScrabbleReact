import { evaluateMoves } from "../Game/AIHelperFunctions"



export const crunch = (pp, ss, tiles, whichRack, maxPoints) => {

    postMessage(`${pp.length} perms, ${ss.length} slots and ${maxPoints}`)
    postMessage(evaluateMoves(pp, ss, tiles, whichRack ) )
}