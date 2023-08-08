import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
export default function Card({ title, healthScore, image, id, diets }) {
  return (
    <div className={styles.cardContainer}>
        <div >
      <Link to={`/detail/${id}`}>
        <h4>{title}</h4>
      </Link>
        </div>
      <p className={styles.healthScore}>Health Score: {healthScore}</p>
      <div >
      <Link to={`/detail/${id}`}>
        <img src={image} alt={title} />
      </Link>
      </div>
      <div >
        {diets.map((diet, index) => (
          <span key={index}>{diet}</span>
        ))}
      </div>
      <p></p>
    </div>
  );
}
