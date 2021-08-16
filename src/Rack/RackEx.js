import React, { useState } from "react";
import styles from "./RackEx.module.css";
import TileEx from "../Tile/TileEx";
import RackSquareEx from "../RackSquare/RackSquareEx";

const RackEx = ({ whichRack, tiles, clickHandlerExt }) => {
  console.log("tiles length is "+ tiles.length)

  



  const squares = [];
  for (let i = 1; i < 8; i++) {
    let piece = (
      <TileEx
        letter={tiles.filter((el)=>{return el.pos === whichRack+i})[0].letter}
        points={tiles.filter((el)=>{return el.pos === whichRack+i})[0].points}
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
