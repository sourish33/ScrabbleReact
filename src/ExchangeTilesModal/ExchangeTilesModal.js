import Modal from "react-bootstrap/Modal"
import ModalBody from "react-bootstrap/ModalBody"
import ModalHeader from "react-bootstrap/ModalHeader"
// import ModalFooter from "react-bootstrap/ModalFooter"
// import ModalTitle from "react-bootstrap/ModalTitle"
import { useState } from "react"
import { Button } from "react-bootstrap"
import RackEx from "../Rack/RackEx"
import styles from './ExchangeTilesModal.module.css'


const ExchangeTilesModal = ({show, onHide, whichRack, tiles}) => {

    return (
        <Modal show = {show} onHide={onHide}>
       <Modal.Header>
            <Modal.Title> Select tiles to exchange </Modal.Title>
            <span className={styles.close} onClick={onHide} >&times;</span>
        </Modal.Header>

        <Modal.Body>
            <div>
                <RackEx
                whichRack = {whichRack}
                tiles = {tiles}>
                </RackEx>
            </div>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" size="lg" className={styles.buttonstyle}>Submit</Button>
           
        </Modal.Footer>

        </Modal>
    )
}

export default ExchangeTilesModal