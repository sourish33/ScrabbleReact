import Modal from "react-bootstrap/Modal"
import ModalBody from "react-bootstrap/ModalBody"
import ModalHeader from "react-bootstrap/ModalHeader"
import ModalFooter from "react-bootstrap/ModalFooter"
import ModalTitle from "react-bootstrap/ModalTitle"
import styles from './AIThinkingModal.module.css'
import { Button, Spinner } from "react-bootstrap"

const AIThinkingModal = ({show, aiSays}) => {

    let aiUbach = aiSays==="" ? "AI thinking..." : aiSays
    const handleExit  = () =>{
        aiUbach = "AI thinking"
    } 
    return (
        <Modal show={show} onExit={handleExit}>
            <ModalBody className={styles.modalbody}>
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
                <div className={styles.spinnertext}>{aiUbach}</div>
            </ModalBody>
        </Modal>
    )
}

export default AIThinkingModal