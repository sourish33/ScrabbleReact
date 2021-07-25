import React from 'react'
import Game from './Game'


const TILE_LIST = new Map()
TILE_LIST.set(5, ["P", 2])
TILE_LIST.set(36, ["X", 10])
TILE_LIST.set(200, ["E", 1])
TILE_LIST.set(115, ["O", 1])
TILE_LIST.set(174, ["J", 8])


function App() {
  return <Game/>
}

export default App;
