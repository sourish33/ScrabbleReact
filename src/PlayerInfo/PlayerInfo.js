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
        <Form.Group className="mb-3">
            <Row>
                <Col xs={6} sm={6}>
                    <Form.Control type="text" value="AI Lily" disabled/>
                </Col>
                <Col xs={6} sm={6}>
                    <Form.Select aria-label="Default select example">
                        <option value="1" active>Weak</option>
                        <option value="2">Medium</option>
                        <option value="3">Strong</option>
                    </Form.Select>
                </Col>
            </Row>
        </Form.Group>
    )
}

const PlayerInfo = () => {
    const [playerArray, setPlayerArray] = useState([])
    const [playerTypes, setPlayerTypes] = useState([])


    const addHumanPlayer = () => {
        setPlayerArray((x) => {
            return [...x, <HumanPlayerForm key={Math.random()} />]
        })
        setPlayerTypes((x)=>{
            return [...x, "H"]
        })
    }

    const addAIPlayer = () => {
        setPlayerArray((x) => {
            return [...x, <AIPlayerForm key={Math.random()} />]
        })
        setPlayerTypes((x)=>{
            return [...x, "M"]
        })
    }

    const removePlayer = () => {
        setPlayerArray((x)=>x.slice(0,-1))
        setPlayerTypes((x)=>x.slice(0,-1))
    }

    return (
        <Form as={Row}>
            <Col sm={12} md={6} lg={6}>
                {playerArray}
                <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    onClick={addHumanPlayer}
                    style={{display: playerArray.length<4 ? "inline-block" : "none" }}
                >
                    Add Human
                </Button>{" "}
                <Button
                    variant="primary"
                    size="lg"
                    type="button"
                    onClick={addAIPlayer}
                    // disabled={playerArray.length > 3}
                    style={{display: playerArray.length<4 ? "inline-block" : "none" }}
                >
                    Add Computer
                </Button>{" "}
                <Button
                    variant="primary"
                    size="lg"
                    type="button"
                    onClick={removePlayer}
                    // disabled={playerArray.length === 0}
                    style={{display: playerArray.length!==0 ? "inline-block" : "none" }}
                >
                    Remove
                </Button>
            </Col>
            {/* <Button
                    className="mt-4"
                    variant="primary"
                    size="lg"
                    type="submit"
                    onClick={()=>{alert(playerTypes)}}
                    // disabled={playerArray.length === 0}
                    
                >
                    Submit Data
                </Button> */}

        </Form>
    )
}

export default PlayerInfo

{
    /* <Form.Group className="mb-3" controlId="formBasicCheckbox">
<Form.Check type="checkbox" label="Check me out" />
</Form.Group> */
}
