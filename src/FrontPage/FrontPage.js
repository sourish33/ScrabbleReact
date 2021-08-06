import React from "react"
import { Button, Container } from "react-bootstrap"
import PlayerInfo from "../PlayerInfo/PlayerInfo"
import styles from "./FrontPage.module.css"

const FrontPage = () => {
    return (
        <div>
            <div className="p-5 mb-4 bg-light rounded-3">
                <h1 className={`display-4 `}>Scrabble React!</h1>
                <h3>A scrabble game built using React.js</h3>
            </div>
            <Container>
                <PlayerInfo />
            </Container>
        </div>
    )
}

export default FrontPage
