import Modal from "react-bootstrap/Modal"
import ModalBody from "react-bootstrap/ModalBody"
import ModalHeader from "react-bootstrap/ModalHeader"
import ModalFooter from "react-bootstrap/ModalFooter"
// import ModalTitle from "react-bootstrap/ModalTitle"
import styles from './PassDevice.module.css'
import { useState } from "react"
import { Button } from "react-bootstrap"

const PassDeviceMessageModal = ({show, onHide, name}) =>{


    return (
    <Modal show={show} onHide={onHide}>
        <ModalHeader>
            Quite a wordsmith there!
        </ModalHeader>
        <ModalBody>
            Please pass to {name}
        </ModalBody>
        <ModalFooter>
            <Button onClick={onHide}>OK</Button>
        </ModalFooter>
    </Modal>
    )
}

export default PassDeviceMessageModal