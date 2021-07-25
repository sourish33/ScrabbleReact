import React from "react"
import Square from "../Square/Square"
import Tile from "../Tile/Tile"

const TWs = [0,7,14]
const DWs = [16, 28]
const TLs = [20, 24]
const S = 112

const renderSquare = (i, piece=null) => {

    let whichBgd = ""

    if (i===S){
        whichBgd="S"
    }
    if (TWs.includes(i)){
        whichBgd="TW"
    }
    if (DWs.includes(i)){
        whichBgd="DW"
    }
    if (TLs.includes(i)){
        whichBgd="TL"
    }
    return (
        <div key={i} style={{ width: '6.66%', height: '6.66%' }}>
          <Square bgd = {whichBgd}>{piece}</Square>  
        </div>
    )

}

const Board = ( {tiles} ) => {

    const squares = []
    for (let i =0;i<225;i++ ){
        if (tiles.has(i)){
            let piece = <Tile letter={tiles.get(i)[0]} points={tiles.get(i)[1]}/>
            squares.push(renderSquare(i, piece))
        }
        else {
        squares.push(renderSquare(i))
        }
    }

    return (
        <div       style={{
            width: '600px',
            height: '600px',
            display: 'flex',
            flexWrap: 'wrap',
          }}>
              {squares}

        </div>


    )
}

export default Board
