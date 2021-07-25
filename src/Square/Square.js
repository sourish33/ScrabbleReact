import React from "react"
import styles from "./Square.module.css"

export default function Square({ bgd, children }) {

    function decodeHTML(html) {
        var txt = document.createElement("textarea")
        txt.innerHTML = html
        return txt.value
    }

    const letter = bgd === "S" ? decodeHTML('&#9733') : bgd
    const mystar = <span className={styles.star}>{letter}</span>

    return (
        <div className={`${styles[bgd]} ${styles[`full-height-width`]}`}>
            {children ? children : mystar}
        </div>
    )
}
