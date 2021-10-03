import Modal from "react-bootstrap/Modal"
import styles from "./Instructions.module.css"
import { Button, CloseButton } from "react-bootstrap"
import PlayInstructions from "./PlayInstructions"

const Instructions = ({ show, onHide }) => {
    return (
        <Modal show={show}>
        <Modal.Header className={styles.centerAlign}>
            <Modal.Title>
                <h1> Instructions</h1>
            </Modal.Title>
        <CloseButton onClick={onHide} />  
        </Modal.Header>
            <Modal.Body>
                <PlayInstructions/>
            </Modal.Body>
            <Modal.Footer className={styles.rightAlign}>
                    <Button variant="secondary" type="button" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Instructions
