import Modal from "react-bootstrap/Modal"
import ModalBody from "react-bootstrap/ModalBody"
import ModalHeader from "react-bootstrap/ModalHeader"
import ModalFooter from "react-bootstrap/ModalFooter"
// import ModalTitle from "react-bootstrap/ModalTitle"
import styles from './PassDevice.module.css'
import { useState } from "react"
import { Button } from "react-bootstrap"

const PassDeviceMessageModal = ({show, onHide}) =>{


    return (
    <Modal show={show} onHide={onHide}>
        <ModalHeader>
            Quite a wordsmith there!
        </ModalHeader>
        <ModalBody>
            Please pass to Ram
        </ModalBody>
        <ModalFooter>
            <button onClick={onHide}>Cancel</button>
        </ModalFooter>
    </Modal>
    )
}

export default PassDeviceMessageModal