import React, { useState } from 'react';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './DefModal.module.css'

export const DefModal = ({show, setShow, word}) => {
//   const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [showSpinner, setShowSpinner] = useState(true)
  const [definition, setDefinition] = useState("")

  useEffect(()=>{
    fetch(`https://helpful-deer-baseball-cap.cyclic.app/dictionary?word=${word}`)
    .then(res=>res.json())
    .then((data)=>{
        setShowSpinner(false)
        if (data.definition.length>0){
            console.log(data.definition[0].Definition)
            setDefinition(data.definition[0].Definition)
        } else{
            setDefinition("No definition found")
        }
        
    })
    

  },[word])

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{word}</Modal.Title>
        </Modal.Header>
        <Modal.Body><Spinner animation="grow" variant="info" className={showSpinner?``:`${styles.hidden}`}/>{definition}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

