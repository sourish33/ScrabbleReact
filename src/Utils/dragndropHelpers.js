export function onDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id)
    // console.log(event.target.id)
}

export function onDragOver(event) {
    event.preventDefault()
}

export function onDrop(event) {
    event.preventDefault()
    let incoming = event.dataTransfer.getData("text")
    let dest = event.currentTarget.id
    console.log(`${incoming} to ${dest}`)
}