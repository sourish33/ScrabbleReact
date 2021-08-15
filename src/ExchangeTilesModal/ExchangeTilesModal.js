import Modal from "react-bootstrap/Modal"
import ModalBody from "react-bootstrap/ModalBody"
import ModalHeader from "react-bootstrap/ModalHeader"
// import ModalFooter from "react-bootstrap/ModalFooter"
// import ModalTitle from "react-bootstrap/ModalTitle"
import { useState } from "react"
import { Button } from "react-bootstrap"
import RackEx from "../Rack/RackEx"


const ExchangeTilesModal = ({show, onHide, whichRack, tiles}) => {

    return (
        <Modal show = {show} onHide={onHide}>
       <Modal.Header>
            <Modal.Title>Tile Exchange</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <RackEx
            whichRack = {whichRack}
            tiles = {tiles}></RackEx>

        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}>Cancel</Button>
        </Modal.Footer>

        </Modal>
    )
}

export default ExchangeTilesModal