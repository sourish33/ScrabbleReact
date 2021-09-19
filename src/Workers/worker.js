// onmessage = function(e) {
//     let ss = e.data[0];
//     let pp = e.data[1];
//     let maxPoints= e.data[2];
//     console.log("Hello! Worker here")


//     postMessage("Aight, I'm outta here")
//     postMessage(ss)
// }

export const crunch = (pp, ss, maxPoints) => {

    postMessage(`${pp.length} perms, ${ss.length} slots and ${maxPoints}`)
    postMessage([1,2,3])
}