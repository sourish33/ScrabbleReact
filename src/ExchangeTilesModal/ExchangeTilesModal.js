import Modal from "react-bootstrap/Modal"
import ModalBody from "react-bootstrap/ModalBody"
import ModalHeader from "react-bootstrap/ModalHeader"
import ModalFooter from "react-bootstrap/ModalFooter"
// import ModalTitle from "react-bootstrap/ModalTitle"
import { useState } from "react"
import { Button } from "react-bootstrap"
import RackEx from "../Rack/RackEx"
import styles from "./ExchangeTilesModal.module.css"

const ExchangeTilesModal = ({ show, onHide, whichRack, tiles, clickHandlerExt, handleSubmit }) => {
    
    const [showRack, setShowRack] = useState("true")
    const handleExit = () => {
        setShowRack(x=>false)
    }

    const restoreRack = () => {
        setShowRack(x=>true)
    }

    return (
        <Modal show={show} onHide={onHide} onExit={handleExit} onExited={restoreRack}>
            <ModalHeader>
                <Modal.Title> Select tiles to exchange </Modal.Title>
                <span className={styles.close} onClick={onHide}>
                    &times;
                </span>
            </ModalHeader>

            <ModalBody>
                <div>
                    {showRack && <RackEx
                        whichRack={whichRack}
                        tiles={tiles}
                        clickHandlerExt={clickHandlerExt}
                    ></RackEx>}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button
                    variant="primary"
                    size="lg"
                    className={styles.buttonstyle}
                    onClick = {handleSubmit}
                >
                    Submit
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ExchangeTilesModal
