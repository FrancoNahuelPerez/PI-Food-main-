import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
export default function Card({ title, healthScore, image, id, diets }) {
  return (
    <div className={styles.cardContainer}>
        <div >
      <Link to={`/detail/${id}`}>
        <p>{title}</p>
      </Link>
        </div>
      <p className={styles.healthScore}>Health Score: {healthScore}</p>
      <div >
      <Link to={`/detail/${id}`}>
        <img src={image} alt={title} />
      </Link>
      </div>
      <div className={styles.dietTypes} >
        <h4>Diet Types:</h4>
      </div>
      <div >
        {diets.map((diet, index) => (
          <li key={index}>{diet}</li>
        ))}
      </div>
      <p></p>
    </div>
  );
}
