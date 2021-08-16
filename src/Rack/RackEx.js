import React, { useState } from "react";
import styles from "./RackEx.module.css";
import { arrayToMap } from "../Utils/helpers";
import TileEx from "../Tile/TileEx";
import RackSquareEx from "../RackSquare/RackSquareEx";

const RackEx = ({ whichRack, tiles }) => {
  // console.log(tiles.length)
  let tilesMap = arrayToMap(tiles);
  const [selectedTiles, setSelectedTiles] = useState(new Set())

  const clickHandlerExt = (event) => {
    let clickedTileNo = parseInt(event.currentTarget.parentNode.parentNode.id[1])
    setSelectedTiles((x)=>{
        if (x.has(clickedTileNo)) {
            x.delete(clickedTileNo)
        } else {
            x.add(clickedTileNo)
        }
        return x
    })
    console.log(selectedTiles)
  };

  const squares = [];
  for (let i = 1; i < 8; i++) {
    let piece = (
      <TileEx
        letter={tilesMap.get(whichRack + i)[0]}
        points={tilesMap.get(whichRack + i)[1]}
        clickHandlerExt = {clickHandlerExt}
      />
    );
    let thisSquare = (
      <div key={i} className={styles.wrappingSquare} id={"e" + i}>
        <RackSquareEx>{piece}</RackSquareEx>
      </div>
    );
    squares.push(thisSquare);
  }

  return (
    <div className={styles.aspectratio}>
      <div className={styles.innerwrapper}>
        <div className={styles.wrappingRack}>{squares}</div>
      </div>
    </div>
  );
};

export default RackEx;
