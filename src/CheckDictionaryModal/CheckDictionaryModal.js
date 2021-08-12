//MODAL
// import ReactDOM from "react-dom"
import Modal from "react-bootstrap/Modal"
import ModalBody from "react-bootstrap/ModalBody"
// import ModalHeader from "react-bootstrap/ModalHeader"
// import ModalFooter from "react-bootstrap/ModalFooter"
// import ModalTitle from "react-bootstrap/ModalTitle"
import styles from './CheckDictionaryModal.module.css'
import scrabbledict, { checkDict } from "../Utils/Dictionary/dictionary"
import { useState } from "react"

const CheckDictionaryModal = ({show}) =>{
    const [word, setWord] = useState("")

    const Result = ({wordToCheck}) =>{
        if (checkDict(wordToCheck)) {
            return <p><span className={styles.green}>{wordToCheck.toUpperCase()}</span> is valid!</p>
        } else {
            return <p><span className={styles.red}>{wordToCheck.toUpperCase()}</span> is not valid</p>
        }
    }

    const handleChange = (event) =>{
        setWord(x=>event.target.value)
    }
    const handleClick = () =>{
        setWord("")
    }
    return (
        <Modal show={show}>
                <ModalBody>
                <div className="mt-0">
				<form>
						<div className="input-group mb-3">
							<input type="text" className="form-control" placeholder="Check dictionary"  
                            value={word}
                            onChange={handleChange} />
							<div className="input-group-append">
							    <button className="btn btn-primary" type="button" onClick={handleClick}>Clear</button>
							</div>
						</div>
				</form>
				{word.length>1 && <Result wordToCheck={word}/>}
                <p className={styles.twoletterwords}>AA, AB, AD, AE, AG, AH, AI, AL, AM, AN, AR, AS, AT, AW, AX, AY, BA, BE, BI, BO, BY, CH, DA, DE, DI, DO, EA, EE, ED, EF, EH, EL, EM, EN, ER, ES, ET, EW, EX, 
				FA, FE, FY, GI, GO, GU, HA, HE, HI, HM, HO, ID, IF, IN, IO, IS, IT, JA, JO, KA, KO, KI, KY, LA, LI, LO, MA, ME, MI, MM, MO, MU, MY, NA, NE, NO, NU, NY, OB, OD, OE, OF, OH, OI, OK, 
				OM, ON, OO, OP, OR, OS, OU, OW, OX, OY, PA, PE, PI, PO, QI, RE, SH, SI, SO, ST, TA, TE, TI, TO, UG, UH, UM, UN, UP, UR, US, UT, WE, WO, XI, XU, YA, YE, YO, YU, ZA, ZE, ZO</p>
			</div>

                </ModalBody>
        </Modal>
    )

}

export default CheckDictionaryModal