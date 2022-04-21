import React from "react";
import styles from "./Dog.module.css"

const Dogs = ({image, name, weight, height, temperament}) => {
    return (
        <div className={styles.cardOne}>
            <img src={image} width="200px" height="250px" alt="Img not found" />
            <p>Name: {name}</p>
            <p>Height: {height}</p>
            <p>temperament: {temperament}</p>
            <p>weight: {weight}</p>
        </div>
    )
}

export default Dogs;