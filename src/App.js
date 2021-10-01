import React, { useEffect } from 'react'
import FrontPage from './FrontPage/FrontPage';
import styles from './App.module.css'




function App() {
  
  useEffect(() => {
    document.title = "Scrabble React!"
    document.body.parentElement.classList.add(styles.noscrollbar)
 }, [])
  
  return <FrontPage/>
}

export default App;
