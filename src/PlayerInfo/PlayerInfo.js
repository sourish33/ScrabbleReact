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
                    <Form.Control type="text" value="AI Lily" />
                </Col>
                <Col xs={6} sm={6}>
                    <Form.Select aria-label="Default select example">
                        <option>Pick AI Strength</option>
                        <option value="1">Weak</option>
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

    // const HumanPlayerArray = []
    // for (let n=0; n<numPlayers;n++){
    //     HumanPlayerArray.push(
    //         <HumanPlayerForm key={n}/>
    //     )
    // }

    const addHumanPlayer = () => {
        setPlayerArray((x) => {
            return [...x, <HumanPlayerForm key={x.length + 1} />]
        })
    }

    const addAIPlayer = () => {
        setPlayerArray((x) => {
            return [...x, <AIPlayerForm key={x.length + 1} />]
        })
    }

    const removePlayer = () => {
        setPlayerArray((x) => {
            let last = x[x.length - 1]
            return x.filter((el) => el !== last)
        })
    }

    return (
        <Form as={Row}>
            <Col sm={12} md={6} lg={6}>
                {playerArray}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={addHumanPlayer}
                    style={{display: playerArray.length<4 ? "inline-block" : "none" }}
                >
                    Add Human
                </Button>{" "}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={addAIPlayer}
                    // disabled={playerArray.length > 3}
                    style={{display: playerArray.length<4 ? "inline-block" : "none" }}
                >
                    Add Computer
                </Button>{" "}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={removePlayer}
                    // disabled={playerArray.length === 0}
                    style={{display: playerArray.length!==0 ? "inline-block" : "none" }}
                >
                    Remove
                </Button>
            </Col>
        </Form>
    )
}

export default PlayerInfo

{
    /* <Form.Group className="mb-3" controlId="formBasicCheckbox">
<Form.Check type="checkbox" label="Check me out" />
</Form.Group> */
}
