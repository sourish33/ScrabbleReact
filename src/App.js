import React from 'react';
import Square from './Square/Square';
import Tile from './Tile/Tile';


function App() {
  return (
    <div>
      {/* <Tile letter="T" points="1"/> */}
      <Square bgd="TL">
      <Tile letter="X" points="10"/>
      </Square>
    </div>
  );
}

export default App;
