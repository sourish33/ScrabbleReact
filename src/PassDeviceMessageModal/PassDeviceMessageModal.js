import Modal from "react-bootstrap/Modal"
import ModalBody from "react-bootstrap/ModalBody"
// import ModalHeader from "react-bootstrap/ModalHeader"
import ModalFooter from "react-bootstrap/ModalFooter"
// import ModalTitle from "react-bootstrap/ModalTitle"
import styles from './PassDevice.module.css'
import { Button } from "react-bootstrap"




const PassDeviceMessageModal = ({show, onHide, name, greeting}) =>{

    return (
    <Modal show={show} onHide={onHide} >
        <Modal.Header>
            <Modal.Title>
            {greeting}
            </Modal.Title>
        </Modal.Header>
        <ModalBody>
            Please pass to {name}
        </ModalBody>
        <ModalFooter>
            <Button variant="primary" size="lg" type= "button" onClick={onHide} className={styles.buttonstyle}>OK</Button>
        </ModalFooter>
    </Modal>
    )
}

export default PassDeviceMessageModal