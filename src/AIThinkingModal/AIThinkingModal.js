import Modal from "react-bootstrap/Modal"
import styles from './AIThinkingModal.module.css'
import { Spinner } from "react-bootstrap"

const AIThinkingModal = ({show, aiSays}) => {

    let aiUbach = aiSays==="" ? "AI thinking..." : aiSays
    return (
        <Modal show={show}>
            <Modal.Body className={styles.modalbody}>
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
                <div className={styles.spinnertext}>{aiUbach}</div>
            </Modal.Body>
        </Modal>
    )
}

export default AIThinkingModal