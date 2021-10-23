import React from "react";
import styles from "./Instructions.module.css"

const PlayInstructions = () => {
    return(
        <div>
                    <ul>
                        <li>Move tiles around either by mouse or touch.</li>
                        <li>
                            The <span className={styles.infobox}>Shuffle</span> button
                            shuffles the tiles on the rack. You can also
                            manually rearrange the rack by dragging tiles.
                        </li>
                        <li>
                            The <span className={styles.infobox}>Exch</span> button
                            allows you to exchange some/all of your tiles (this
                            costs you your turn).
                        </li>
                        <li>
                            The <span className={styles.infobox}>Recall</span> button sends
                            all the unsubmitted tiles on the board back to the
                            rack
                        </li>
                        <li>
                            <span className={styles.infobox}>Points possible</span> shows
                            the points you could earn assuming your words are in
                            the dictionary
                        </li>
                        <li>
                            The <span className={styles.infobox}>Play</span> button submit
                            tiles on the board.
                        </li>
                        <li>
                            The current player will be{" "}
                            <span className={styles.highlight}>highlighted</span>
                        </li>
                        <li>
                            The <span className={styles.infobox}>Dict</span> button brings
                            up a dictionary and a list of two-letter words.
                        </li>
                        <li>
                            The <span className={styles.infobox}>Save</span> button saves
                            the current state of the game in the browser's local
                            storage. If a saved game exists you will be asked
                            whether to reload it upon resuming
                        </li>
                        <li>
                            All words played by the AI are valid words according
                            to the <a href='https://www.collinsdictionary.com/us/scrabble/'>Collins Scrabble Dictionary</a>.
                        </li>
                    </ul>
                </div>
    )
}

export default PlayInstructions