import Modal from "react-bootstrap/Modal"
import ModalBody from "react-bootstrap/ModalBody"
import ModalHeader from "react-bootstrap/ModalHeader"
// import ModalFooter from "react-bootstrap/ModalFooter"
// import ModalTitle from "react-bootstrap/ModalTitle"
import { useState } from "react"
import { Button } from "react-bootstrap"
import RackEx from "../Rack/RackEx"
import styles from "./ExchangeTilesModal.module.css"

const ExchangeTilesModal = ({ show, onHide, whichRack, tiles }) => {
    const [selectedTiles, setSelectedTiles] = useState(new Set())
    const clickHandlerExt = (event) => {
        let clickedTileNo = parseInt(
            event.currentTarget.parentNode.parentNode.id[1]
        )
        setSelectedTiles((x) => {
            if (x.has(clickedTileNo)) {
                x.delete(clickedTileNo)
            } else {
                x.add(clickedTileNo)
            }
            return x
        })
        
    }

    const handleSubmit = () => {
        console.log(selectedTiles)
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header>
                <Modal.Title> Select tiles to exchange </Modal.Title>
                <span className={styles.close} onClick={onHide}>
                    &times;
                </span>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <RackEx
                        whichRack={whichRack}
                        tiles={tiles}
                        clickHandlerExt={clickHandlerExt}
                    ></RackEx>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    size="lg"
                    className={styles.buttonstyle}
                    onClick = {handleSubmit}
                >
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ExchangeTilesModal
