import Modal from "react-bootstrap/Modal"
import styles from './PassDevice.module.css'
import { Button, Table } from "react-bootstrap"




const PassDeviceMessageModal = ({show, onHide, name, greeting, playersAndPoints, lastPlayed}) =>{

    const theGreeting = <h2 >{greeting}</h2>
    const latestPlay = lastPlayed.length===0 ? null : <h4>{`${lastPlayed[0].player} played ${lastPlayed[0].word} for ${lastPlayed[0].points}`}</h4>

    const scoreTable = (playersAndPoints) => {
        return (
            <Table striped bordered size="sm" className={styles.mytable}>
                <tbody>
                    {playersAndPoints.map((el, ind) => {
                        return (
                            <tr  key={"row" + ind}>
                                <td>
                                    <span className={styles.tdstyle}>{el.name}</span>
                                </td>
                                <td><span className={styles.tdstyle}>{el.points}</span></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    return (
    <Modal show={show} onHide={onHide} >
        <Modal.Header className={styles.centerTop}>
            <Modal.Title>
            {theGreeting}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {latestPlay}
            {greeting === "Lets Get Started!" ? null : scoreTable(playersAndPoints)}
            <h4 className={styles.centerMid} >Please pass to {name}</h4>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" size="lg" type= "button" onClick={onHide} className={styles.buttonstyle}>OK</Button>
        </Modal.Footer>
    </Modal>
    )
}

export default PassDeviceMessageModal