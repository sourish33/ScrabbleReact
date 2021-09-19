import { evaluateMoves } from "../Game/AIHelperFunctions"



export const crunch = (pp, ss, tiles, whichRack, maxPoints) => {

    postMessage(`${pp.length} perms and ${ss.length} slots`)
    postMessage(evaluateMoves(pp, ss, tiles, whichRack ) )
}