import React, { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import styles from "./PlayerInfo.module.css"

const HumanPlayerForm = () => {
    return (
        <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Player Name" />
        </Form.Group>
    )
    
}

const AIPlayerForm = () => {
    return (
        <Form.Group as={Row} className="mb-3">
        <Col sm="6">
            <Form.Control type="text" value="AI Lily" />
        </Col>
        <Col sm="6">
            <Form.Select aria-label="Default select example">
                <option>Pick AI Strength</option>
                <option value="1">Weak</option>
                <option value="2">Medium</option>
                <option value="3">Strong</option>
            </Form.Select>
        </Col>
    </Form.Group>
    )
}

const PlayerInfo = () => {
    const [numPlayers, setNumPlayers] = useState(0)


    const HumanPlayerArray = []
    for (let n=0; n<numPlayers;n++){
        HumanPlayerArray.push(
            <HumanPlayerForm key={n}/>
        )
    }

    return (
        <Form as={Row}>
            <Col sm="6">
               {HumanPlayerArray}
                <AIPlayerForm/>
                <Button variant="primary" type="submit">
                    Add Human
                </Button>{" "}
                <Button variant="primary" type="submit">
                    Add Computer
                </Button>{" "}
                <Button variant="primary" type="submit">
                    Remove
                </Button>
            </Col>
        </Form>
    )
}

export default PlayerInfo


{/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
<Form.Check type="checkbox" label="Check me out" />
</Form.Group> */}
