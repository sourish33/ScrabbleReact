import React, { useEffect } from 'react'
import FrontPage from './FrontPage/FrontPage';




function App() {
  
  useEffect(() => {
    document.title = "Scrabble React!"
 }, [])
  document.body.parentElement.style.scrollbarWidth='none'
  return <FrontPage/>
}

export default App;
