import React from "react";
import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={styles.card}>
      List of {props.title} in {props.value}
    </div>
  );
};

export default Card;
