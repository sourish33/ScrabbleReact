import React, { useEffect } from 'react'
import FrontPage from './FrontPage/FrontPage';
import Game from './Game/Game'




function App() {
  useEffect(() => {
    document.title = "Scrabble React!"
 }, [])
  return <FrontPage/>
  // return <Game/>
}

export default App;
