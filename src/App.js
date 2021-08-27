import React, { useEffect } from 'react'
import FrontPage from './FrontPage/FrontPage';




function App() {
  useEffect(() => {
    document.title = "Scrabble React!"
 }, [])
  return <FrontPage/>
}

export default App;
