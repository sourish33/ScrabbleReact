import React from "react"
import styles from "./RackSquare.module.css"

const RackSquare = ({children}) => {

    return (
        <div className={styles.racksquare}>
            {children}
        </div>
    )

}

export default RackSquare